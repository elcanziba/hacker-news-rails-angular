class AddKindToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :kind, :boolean, :default => true
  end
end
