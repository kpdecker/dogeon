var DSON = require('../lib'),
    expect = require('chai').expect;

describe('dson-parse', function() {
  describe('#parse', function() {
    it('should handle objects', function() {
      expect(DSON.parse('such  wow')).to.eql({});
      expect(DSON.parse('such "foo" is "bar" wow')).to.eql({foo: 'bar'});
      expect(DSON.parse('such "foo" is "bar" next "bat" is "baz" wow')).to.eql({foo: 'bar', bat: 'baz'});
    });
    it('should handle arrays', function() {
      expect(DSON.parse('so  many')).to.eql([]);
      expect(DSON.parse('so "bar" many')).to.eql(['bar']);
      expect(DSON.parse('so "bar" next "baz" many')).to.eql(['bar', 'baz']);
    });
    it('should handle nesting', function() {
      expect(DSON.parse('so such wow next so "bat" many many')).to.eql([{}, ['bat']]);
    });
    it('should handle strings', function() {
      expect(DSON.parse('"bat"')).to.equal('bat');
    });
    it('should handle numbers', function() {
      expect(DSON.parse('1')).to.equal(1);
      expect(DSON.parse('1very5')).to.equal(1e5);
      expect(DSON.parse('1very-5')).to.equal(1e-5);
    });
    it('should handle literals', function() {
      expect(DSON.parse('notfalse')).to.equal(true);
      expect(DSON.parse('nottrue')).to.equal(false);
      expect(DSON.parse('nullish')).to.equal(null);
    });
  });
  describe('#stringify', function() {
    it('should handle objects', function() {
      expect(DSON.stringify({})).to.equal('such  wow');
      expect(DSON.stringify({foo: 'bar'})).to.equal('such "foo" is "bar" wow');
      expect(DSON.stringify({foo: 'bar', bat: 'baz'})).to.equal('such "foo" is "bar" next "bat" is "baz" wow');
    });
    it('should handle arrays', function() {
      expect(DSON.stringify([])).to.equal('so  many');
      expect(DSON.stringify(['bar'])).to.equal('so "bar" many');
      expect(DSON.stringify(['bar', 'baz'])).to.equal('so "bar" next "baz" many');
    });
    it('should handle nesting', function() {
      expect(DSON.stringify([{}, ['bat']])).to.equal('so such  wow next so "bat" many many');
    });
    it('should handle strings', function() {
      expect(DSON.stringify('bat')).to.equal('"bat"');
    });
    it('should handle numbers', function() {
      expect(DSON.stringify(1)).to.equal('1');
      expect(DSON.stringify(1e5)).to.equal('100000');
    });
    it('should handle literals', function() {
      expect(DSON.stringify(true)).to.equal('notfalse');
      expect(DSON.stringify(false)).to.equal('nottrue');
      expect(DSON.stringify(null)).to.equal('nullish');
    });
  });
});
