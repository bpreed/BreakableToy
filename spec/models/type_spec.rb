require 'rails_helper'

RSpec.describe Type do
  let(:type) { Type.new(
    name: 'Road Race'
  ) }

  describe 'validations' do
    describe 'name' do
      it 'must be present' do
        expect(type).to be_valid
        type.name = nil
        expect(type).to_not be_valid
      end
    end
  end
end
