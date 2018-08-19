require 'rails_helper'

RSpec.describe Team do
  let(:user) { User.new(
    username: 'Steve',
    email: 'steve@steve.com',
    password: 'password1',
    id: 2
    )}

  let(:team) { Team.new(
    name: 'Stampede',
    description: 'We crash harder than you!',
    captain: user,
    created_by: 2
  )}


  describe 'validations' do
    describe 'name' do
      it 'must be present' do
        expect(team).to be_valid
        team.name = nil
        expect(team).to_not be_valid
      end
    end

    describe 'description' do
      it 'must be present' do
        expect(team).to be_valid
        team.description = nil
        expect(team).to_not be_valid
      end
    end
  end
end
