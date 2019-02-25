class Restaurant < ApplicationRecord
    has_many :users, through: :matches 
end
