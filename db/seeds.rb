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

