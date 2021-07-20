var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('is - Icelandic', function () {
    var tokenizer = t();
    var tokenize = tokenizer.tokenize;
    var fp = tokenizer.getTokensFP;
    it('should tokenize a sentence in icelandic', function () {
        var output = [{ value: 'Vinr', tag: 'word' },
        { value: 'er', tag: 'word' },
        { value: 'sás', tag: 'word' },
        { value: 'vörnuð', tag: 'word' },
        { value: 'býðr', tag: 'word' },
        { value: '.', tag: 'punctuation' }];
        expect(t().tokenize('Vinr er sás vörnuð býðr.')).to.deep.equal(output);
    });
});
