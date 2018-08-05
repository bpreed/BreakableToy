class EventSerializer < ActiveModel::Serializer
  attributes :bike_reg_id, :BTId, :name, :address, :city, :state, :date, :url, :latitude, :longitude, :reg_open, :reg_close, :types

  def BTId
    object.id
  end

  def types
    types = []
    # binding.pry
    object.event_types.each do |type|
      types << Type.find(type.type_id).name
    end
    types
  end

end
