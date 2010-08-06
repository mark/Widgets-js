class DataController < ApplicationController

  #
  #   When a widget requires new data, it sends a request to
  #   DataController#fetch with an array of names/id's
  #   of wallboard data to be updated.
  #
  #   DataDispatch.dispatch then computes the data updates and passes
  #   a JavaScript update to PageData containing the data updates.
  #   ( see app/views/display_elements/_base.html.erb )
  #
  def fetch
    values_array = params[:request].values
    response_data = WidgetDispatcher.dispatch(values_array).to_json
    render :json => response_data
  end

end
