class HomepageController < ApplicationController

  def index
    @widgets = Widget.all
  end
  
end
