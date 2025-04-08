# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Suppression des anciennes données
Survey.destroy_all
Question.destroy_all

# Création d'un sondage
survey = Survey.create

# Création des questions associées au sondage

Question.create(survey_id: survey.id, question: "Quelle est ton humeur ?")
Question.create(survey_id: survey.id, question: "Sais-tu situer le DO sur un piano ?")

puts "Données seeds mises à jour avec succès !"


puts "Nettoyage des anciens challenges..."
Challenge.destroy_all

puts "Création de challenges..."

challenges_data = [
  {
    title: "Improviser sur une gamme mineure",
    description: "Compose une mélodie de 8 mesures en utilisant uniquement la gamme mineure de La. Bonus si tu varies le rythme.",
    difficulty: "medium",
    active: true
  },
  {
    title: "Créer un thème de film",
    description: "Imagine que tu écris la musique d’ouverture d’un thriller. Écris une courte mélodie en mode mineur.",
    difficulty: "hard",
    active: true
  },
  {
    title: "Défi des 3 notes",
    description: "Crée une boucle mélodique en n'utilisant que 3 notes de ton choix. À toi de jouer sur le rythme et l'intensité.",
    difficulty: "easy",
    active: true
  },
  {
    title: "Challenge silence",
    description: "Écris une mélodie avec au moins 3 silences bien placés. Le vide peut aussi faire vibrer !",
    difficulty: "medium",
    active: true
  },
  {
    title: "Le défi du rythme binaire",
    description: "Compose une mélodie simple, mais uniquement avec des croches et des noires.",
    difficulty: "easy",
    active: false # volontairement inactif pour tester les filtres
  }
]

Challenge.create!(challenges_data)

puts "#{Challenge.count} challenges créés."
puts "#{Challenge.where(active: true).count} challenges actifs."

puts "Nettoyage de la base..."
Composition.destroy_all
User.destroy_all

puts "Création d'un utilisateur de démo..."
user = User.create!(
  email: "demo@melodymentor.com",
  password: "password"
)
puts "✅ User '#{user}' créé avec succès"

puts "Création de 8 compositions de démonstration..."

# Définir les données de base
titles = [
  "Sous la Lune", "Cœurs d’Argent", "Rythme Sauvage", "Mélodie Éphémère",
  "Le Dernier Voyage", "Échos des Étoiles", "Sous les Vagues", "Les Ailes de la Liberté",
  "Chanson du Silence", "Vibration Tropicale", "Fragments d’Un Songe",
  "Tempête Céleste", "Ensemble Perdu", "Danse des Ombres", "Parfum d’Été",
  "Souffle d’Hiver", "Sérénité Nocturne", "Voyage Interstellaire"
]

key_signatures = ['Do', 'Sol', 'Mi', 'La']
moods = ['majeur', 'mineur']

# Fonction pour générer une date aléatoire
def random_date(from_date, to_date)
  rand(from_date.to_time.to_i..to_date.to_time.to_i).then { |timestamp| Time.at(timestamp).to_date }
end

# Dates de départ et de fin pour les dates aléatoires (1 an en arrière jusqu'à aujourd'hui)
start_date = 1.year.ago
end_date = Date.today

# Création de 8 compositions
8.times do |i|
  title = titles.sample
  key_signature = key_signatures.sample
  mood = moods.sample

  audio_directory = case key_signature.downcase
                    when 'do' then 'Do-Lam'
                    when 'sol' then 'Sol-Mim'
                    when 'mi' then 'Sol-Mim'
                    when 'la' then 'Do-Lam'
                    else 'Do-Lam' # Cas par défaut
                    end

  audio_files_path = Rails.root.join('public', 'audios', audio_directory)
  audio_files = Dir.glob("#{audio_files_path}/*.mp3")

  if audio_files.any?
    selected_audio_file = audio_files.sample
  else
    selected_audio_file = Rails.root.join('public', 'audios', 'Do-Lam', 'Do7.mp3')
  end

  # Création de la composition
  composition = user.compositions.create!(
    title: title,
    key_signature: key_signature,
    mood: mood,
    style: ["Pop", "Jazz", "Classique", "Rock", "Électronique", "Ambiant"].sample,
    audio: Rails.root.join(selected_audio_file).open, # Utilisation de selected_audio_file
    # Ajout des dates aléatoires
    created_at: random_date(start_date, end_date),
    updated_at: random_date(start_date, end_date)
  )

  composition.update(duration: rand(120..300))

  puts "✅ Composition créée : #{composition.title} (Durée : #{composition.duration}s)"
end

puts "✅ 8 compositions créées pour l'utilisateur DemoUser"
