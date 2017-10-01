class AddCheckedToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :checked, :boolean, :default => false
  end
end
