class MatchesController < ApplicationController
    before_action :define_current_match
    # skip_before_action :verify_authenticity_token
        
        def create
            match = Match.create(match_params)
            render json: match
        end
        
        def index
            render json: Match.all
        end
        
        def show
            render json: current_match
        end
        
        def update
            current_match.update(match_params)
            render json: current_match
        end
        
        def destroy
            current_match.destroy
            render json: current_match
        end
        
        def match_params
            params.permit(:user_id, :business_id)
        end
        
        def define_current_match
            if params[:id]
                @current_match = Match.find(params[:id])
            else
                @current_match = Match.new
            end
        end
        
        def current_match
            @current_match
        end
end
