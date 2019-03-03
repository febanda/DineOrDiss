class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.belongs_to :user, foreign_key: true
      t.string :business_id
      t.timestamps
    end
  end
end
