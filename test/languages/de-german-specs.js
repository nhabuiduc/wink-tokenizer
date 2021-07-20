var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('de - German', function () {
    var tokenizer = t();
    var tokenize = tokenizer.tokenize;
    var fp = tokenizer.getTokensFP;
    it('should tokenize a sentence in german', function () {
        var output = [{ value: 'Übung', tag: 'word' },
        { value: 'macht', tag: 'word' },
        { value: 'den', tag: 'word' },
        { value: 'Meister', tag: 'word' },
        { value: '.', tag: 'punctuation' }];
        expect(t().tokenize('Übung macht den Meister.')).to.deep.equal(output);
    });
});
