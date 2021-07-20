var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('es - Spanish', function () {
    var tokenizer = t();
    var tokenize = tokenizer.tokenize;
    var fp = tokenizer.getTokensFP;

    it('should tokenize a sentence in spanish', function () {
        var output = [{ value: 'Donde', tag: 'word' },
        { value: 'hay', tag: 'word' },
        { value: 'gana', tag: 'word' },
        { value: ',', tag: 'punctuation' },
        { value: 'hay', tag: 'word' },
        { value: 'maña', tag: 'word' },
        { value: '.', tag: 'punctuation' }];
        expect(t().tokenize('Donde hay gana, hay maña.')).to.deep.equal(output);
    });
});
