class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.integer :vues, :default => 0
      t.references :user, foreign_key: true
      t.string :title
      t.text :description
      t.string :source
      t.integer :upvote, :default => 0
      t.integer :downvote, :default => 0

      t.timestamps
    end
  end
end
