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
Question.create(survey_id: survey.id, question: "Quelle est la musique que tu écoutes en boucle en ce moment ?")
Question.create(survey_id: survey.id, question: "Quels sont tes 3 groupes préférés du moment ?")
Question.create(survey_id: survey.id, question: "Sais-tu situer le DO sur un piano ?")

puts "Données seeds mises à jour avec succès !"
