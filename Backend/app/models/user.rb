class User < ApplicationRecord
    has_secure_password
    has_many :matches 

    validates :name, presence: true
    validates :email, presence: true
    validates :password, presence: true

    def token 
        JWT.encode({user_id: self.id}, 'asdf')
        
    end
    
end


  