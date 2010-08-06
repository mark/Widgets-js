# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper

  def widget_style_string(widget)
    if widget.width && widget.height
      "height:#{ widget.height }; width: #{ widget.width };"
    else
      nil
    end
  end
  
end
