class AddCategoriesToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :categories, :string, array: true, default: '{}'
  end
end
