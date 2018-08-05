class BikeRegResult

  include HTTParty
  base_uri 'www.BikeReg.com'

  def initialize(name: "", region: "", states: "", loc: "", distance: "", eventtype: "", permit: "", startpage: "", year: "")
    @options = { query: { name: name, region: region, states: states, loc: loc, distance: distance, eventtype: eventtype, permit: permit, startpage: startpage, year: year } }
  end

  # def initialize(name = "", region = "", states = "", loc = "", distance = "", eventtype = "", permit = "", startpage = "", year: "")
  #   @options = { query: { name: name, region: region, states: states, loc: loc, distance: distance, eventtype: eventtype, permit: permit, startpage: startpage, year: year } }
  # end

  # def result_count
  #   self.class.get("api/search", @options)
  # end
  #
  def matching_events
    self.class.get("/api/search", @options)
  end
end

# bikereg_results = BikeRegResult.new( , "Northeast", , , , , , , )
