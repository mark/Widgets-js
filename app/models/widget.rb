class Widget < ActiveRecord::Base

  ####################
  #                  #
  # Instance Methods #
  #                  #
  ####################
  
  def data
    JSON.parse data_string
  end
  
  def data=(new_data)
    raw_data = JSON.dump new_data
    write_attribute('data', raw_data)
  end

  def data_string
    if self.class == Widget
      read_attribute('data')
    else
      JSON.dump data
    end
  end
  
  def renderer
    self.class.name[0..-9].split('::').last.underscore.tr('_', '-')
  end
  
end
