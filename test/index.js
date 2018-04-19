
const should = require('chai').should();
const BabyGotBackend = require('../index');
const BabyGotError = require('../src/errors');

const buildababy = options => ( () => BabyGotBackend(options) );

describe('BabyGotError', () => {
  it('throws when no options', () => {
    buildababy().should.throw(BabyGotError, 'no pageSpecs found');
  });
  it('throws when no pageSpecs', () => {
    buildababy({stuff: 'but not pageSpecs'}).should.throw(BabyGotError, 'no pageSpecs found');
  });
});
