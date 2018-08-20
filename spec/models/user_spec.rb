require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.new(
    username: 'Steve',
    email: 'steve@steve.com',
    password: 'password1'
  )}

  describe 'validations' do
    describe 'username' do
      it 'must be present' do
        expect(user).to be_valid
        user.username = nil
        expect(user).to_not be_valid
      end
    end

    describe 'username' do
      it 'must be present less than 11 characters' do
        expect(user).to be_valid
        user.username = "toolongusername"
        expect(user).to_not be_valid
      end
    end

    describe 'email' do
      it 'must be present' do
        expect(user).to be_valid
        user.email = nil
        expect(user).to_not be_valid
      end
    end

    describe 'password' do
      it 'must be present' do
        expect(user).to be_valid
        user.password = nil
        expect(user).to_not be_valid
      end
    end
  end
end
