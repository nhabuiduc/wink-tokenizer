var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('Regex custom', function () {
    it('able to pass custom regex', function () {
        var tokenizer = t(/[a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u024F\u1E00-\u1EFF\u0300-\u036F]+/gi);
        var output = [{ value: 'Hôm', tag: 'word' },
        { value: 'qua', tag: 'word' },
        { value: 'em', tag: 'word' },
        { value: 'đi', tag: 'word' },
        { value: '.', tag: 'punctuation' }];
        expect(tokenizer.tokenize('Hôm qua em đi.')).to.deep.equal(output);
    });
});
