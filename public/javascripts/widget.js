// WidgetData contains the server side generated data for each widget
//   element. This will be updated every time new data is fetched.

WidgetData = new Object();

// PageRequests will be for keeping track of request
//   hashes to send back to the server for each visual element.

PageRequests = new Object();

// WidgetRenderers is a namespace for all of the methods we use to display
//   widget data.

WidgetRenderers = new Object();

// jQuery plugins:

$.fn.widget = function() {
  return this.each( function() {
    var element = $(this);

    // Clear out the current display:
    element.html('');

    // Fetch the needed attributes:
    var widget_id = parseInt(element.attr('data-widget-id'), 10);
    var dom_id    = element.attr('id');
    var renderer  = element.attr('data-renderer');

    // Get the stored data for this widget:
    var data = data_for_widget(widget_id);

    // Get the renderer function for this widget:
    var renderer_function = get_widget_renderer(renderer);

    if (renderer_function == null) {
        print_error_message("widget renderer '" + renderer + "' not found.")
    } else {
        // Render the widget:
        renderer_function(dom_id, data);
    }

  });
}

// When the page loads:

jQuery(document).ready( function() {

  // Find all widget display elements and render them:

  $('div.widget_frame').widget();

});

function register_widget_data(widget_id, json_data) {
    WidgetData[widget_id] = json_data;
}

function data_for_widget(widget_id) {
    return WidgetData[widget_id];
}

function get_widget_renderer(renderer_name) {
    return WidgetRenderers[renderer_name];
}

function register_widget_renderer(name, renderer_function) {
    WidgetRenderers[name] = renderer_function;
}

function print_error_message(string) {
    if (console.log) {
        console.log(string);
    }
}

// function request_new_data(select_function) {
//   var wallboard = [];
// 
//   // Create an array of all of the request hashes for visible wallboard elements:
// 
//   for (var k in PageRequests) {
// 	request = PageRequests[k];
// 	
// 	if ( select_function == null || select_function(request) ) {
// 		wallboard.push( request );
// 	}
//   }
// 
//   // Request the new data from the server:
// 
//   jQuery.getJSON('/data', { request: wallboard, time_window:  }, update_data);
// }

function update_data(new_data, status) {
  if (status != 'success') return;

  for (var i = 0; i < new_data.length; i++) {
    var widget_id = new_data[i].widget_id;
    var data      = new_data[i].data;

    // Store the new data we've fetched:

    register_widget_data(widget_id, data);
  }

  // Now redisplay all of the wallboard elements:

  $('.widget_frame').widget();
}
