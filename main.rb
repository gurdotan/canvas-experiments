# myapp.rb
require 'sinatra'

set :public_folder, File.dirname(__FILE__)
set :views, settings.root


use_grid = false
get '/set' do
  use_grid = !use_grid
end
get '/store' do
  @use_grid = use_grid
  erb :index
end
