class RestaurantsController < ApplicationController
    before_action :define_current_restaurant
    skip_before_action :verify_authenticity_token
        
        def create
            restaurant = Restaurant.create(restaurant_params)
            render json: restaurant
        end
        
        def index
            render json: Restaurant.all
        end
        
        def show
            render json: current_restaurant
        end
        
        def update
            current_restaurant.update(restaurant_params)
            render json: current_restaurant
        end
        
        def destroy
            current_restaurant.destroy
            render json: current_restaurant
        end
        
        def restaurant_params
            params.permit(:name, :password_digest, :email)
        end
        
        def define_current_restaurant
            if params[:id]
                @current_restaurant = Restaurant.find(params[:id])
            else
                @current_restaurant = Restaurant.new
            end
        end
        
        def current_restaurant
            @current_restaurant
        end

end
