class User < ApplicationRecord
    has_secure_password
    has_many :restaurants, through: :matches 

    def token 
        JWT.encode({user_id: self.id}, 'asdf')
        
    end
    
end


  