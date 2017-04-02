const assert = require('chai').assert;
const calculateEnergy = require('../src/pixel').calculateEnergy;

describe('image', function() {
    const image = {};
    it('should return inifinity for null coordinates', function() {
        assert.equal(calculateEnergy(null, null, image), Infinity);
    });
    it('should return infinity for undefined coordinates', function() {
        assert.equal(calculateEnergy(undefined, undefined, image), Infinity);
    });
});
