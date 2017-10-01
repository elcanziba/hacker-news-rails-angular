class AddScoreToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :score, :integer, :default => 0
  end
end
