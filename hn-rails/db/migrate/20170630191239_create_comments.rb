class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.references :post, foreign_key: true
      t.references :user, foreign_key: true
      t.text :content
      t.integer :upvote, :default => 0
      t.integer :downvote, :default => 0

      t.timestamps
    end
  end
end
