
const should = require('chai').should();
const babyGotBackend = require('../src');
const BabyGotError = require('../src/errors');

const buildababy = options => ( () => babyGotBackend(options) );

describe('BabyGotError', () => {
  it('throws when no options', () => {
    buildababy().should.throw(BabyGotError, 'no pageSpecs or options');
  });
  it('throws when no pageSpecs', () => {
    buildababy({stuff: 'but not pageSpecs'}).should.throw(BabyGotError, 'no pageSpecs found');
  });
});
