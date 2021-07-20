var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('fr - French', function () {
    var tokenizer = t();
    var tokenize = tokenizer.tokenize;
    var fp = tokenizer.getTokensFP;


    it('should tokenize a sentence in french', function () {
        var output = [{ value: 'Petit', tag: 'word' },
        { value: 'a', tag: 'word' },
        { value: 'petit', tag: 'word' },
        { value: ',', tag: 'punctuation' },
        { value: 'l', tag: 'word' },
        { value: '’', tag: 'punctuation' },
        { value: 'oiseau', tag: 'word' },
        { value: 'fait', tag: 'word' },
        { value: 'son', tag: 'word' },
        { value: 'nid', tag: 'word' }];
        expect(t().tokenize('Petit a petit, l’oiseau fait son nid')).to.deep.equal(output);
    });

    it('should tokenize another sentence in french', function () {
        var output = [{ value: 'Mieux', tag: 'word' },
        { value: 'vaut', tag: 'word' },
        { value: 'prévenir', tag: 'word' },
        { value: 'que', tag: 'word' },
        { value: 'guérir', tag: 'word' },
        { value: ':)', tag: 'emoticon' }];
        expect(t().tokenize('Mieux vaut prévenir que guérir:)')).to.deep.equal(output);
    });
});
