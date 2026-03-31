var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('Small Issues', function () {
    it('should not parse times', function () {
        var output = [ { value: '12', tag: 'number' }, { value: 'amand', tag: 'word' } ];
        var rs = t().tokenize('12 amand');
        expect(rs).to.deep.equal(output);
    });
});
