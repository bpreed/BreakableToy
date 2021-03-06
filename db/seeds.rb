# require 'httparty'

search = BikeRegResult.new(region: "Northeast")

events = search.matching_events

search.create_events(events)

# def create_events(search)
#
#   events["MatchingEvents"].each do |event|
#     # Skip events without dates (unlikely)
#     next if event["EventDate"] == nil
#     date_trim = event["EventDate"][6...19]
#     date = Time.at(date_trim.to_i/1000).to_s
#
#     #skip events that already happened
#     next if date < Time.now
#
#     reg_open_trim = event["RegOpenDate"][6...19]
#     reg_open_date = Time.at(reg_open_trim.to_i/1000).to_s
#
#     reg_close_trim = event["RegCloseDate"][6...19]
#     reg_close_date = Time.at(reg_close_trim.to_i/1000).to_s
#
#     e = Event.new(name: event["EventName"], bike_reg_id: event["EventId"], address: event["EventAddress"], city: event["EventCity"], state: event["EventState"], date: date, url: event["EventPermalink"], latitude: event["Latitude"], longitude: event["Longitude"], reg_open: reg_open_date, reg_close: reg_close_date)
#     e.save
#     event["EventTypes"].each do |type|
#       if Type.find_by(name: type)
#         t = Type.find_by(name: type)
#         EventType.create!(event: e, type: t)
#       end
#     end
#   end
# end
