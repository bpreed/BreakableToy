class EventSerializer < ActiveModel::Serializer
  attributes :EventId, :BTId, :EventName, :EventAddress, :EventCity, :EventState, :EventDate, :EventUrl, :latitude, :longitude, :RegOpenDate, :RegCloseDate, :EventTypes

  def BTId
    object.id
  end

  def EventId
    object.bike_reg_id
  end

  def EventName
    object.name
  end

  def EventAddress
    object.address
  end

  def EventCity
    object.city
  end

  def EventState
    object.state
  end

  def EventDate
    object.date
  end

  def EventUrl
    object.url
  end

  def Latitude
    object.latitude
  end

  def Longitude
    object.longitude
  end

  def RegOpenDate
    object.reg_open
  end

  def RegCloseDate
    object.reg_close
  end

  def EventTypes
    object.types
  end

end
