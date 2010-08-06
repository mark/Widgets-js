class WidgetDispatcher
  
  #################
  #               #
  # Class Methods #
  #               #
  #################

  def self.dispatch(data_requests)
    dispatcher = WidgetDispatcher.new

    data_requests.map do |request|
      dispatcher.dispatch(request)
    end.compact
  end

  ####################
  #                  #
  # Instance Methods #
  #                  #
  ####################

  def initialize
    @producers = Hash.new
  end

  #
  # WidgetDispatcher#dispatch - Takes the params from the UI
  #   Computes the data updates requested and returns a
  #   hash of the data updates.
  #
  def dispatch(request)
    request_type = request[ 'type' ]
    return nil unless request_type

    producer_class_name_fragment = request_type.tr('-', '_').underscore.camelize
    producer_class_name = "Widgets::#{ producer_class_name_fragment }Producer"
    producer_class = producer_class_name.constantize rescue nil
    
    producer = @producers[ request_type ] ||= DATA_PRODUCERS[ request_type ].try(:new)
    return nil unless producer

    producer.produce_data(request)
  end
  
end
