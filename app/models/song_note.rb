class SongNote < ApplicationRecord
  belongs_to :note
  belongs_to :composition_piano
end
