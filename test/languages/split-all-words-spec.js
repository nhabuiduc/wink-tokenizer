var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('split all words', function () {
    var tokenizer = t("all-words");
    it('should tokenize a sentence in Hebrew', function () {
        const rs = tokenizer.tokenize(`איך נטוס עם גד כץ, הזקן שמֻחלף בצרפת?
        Übung macht den Meister.
        Petit a petit, l’oiseau fait son nid
        hit me up on my email
        Mẹ dắt tay từng bước 
        סכנה! זאב גוי עצל קפץ דרך מטף שתן חם.`);

        expect(rs).deep.equal([
            { value: 'איך', tag: 'alien' },
            { value: 'נטוס', tag: 'alien' },
            { value: 'עם', tag: 'alien' },
            { value: 'גד', tag: 'alien' },
            { value: 'כץ', tag: 'alien' },
            { value: ',', tag: 'punctuation' },
            { value: 'הזקן', tag: 'alien' },
            { value: 'שמֻחלף', tag: 'alien' },
            { value: 'בצרפת', tag: 'alien' },
            { value: '?', tag: 'punctuation' },
            { value: 'Übung', tag: 'alien' },
            { value: 'macht', tag: 'alien' },
            { value: 'den', tag: 'alien' },
            { value: 'Meister', tag: 'alien' },
            { value: '.', tag: 'punctuation' },
            { value: 'Petit', tag: 'alien' },
            { value: 'a', tag: 'alien' },
            { value: 'petit', tag: 'alien' },
            { value: ',', tag: 'punctuation' },
            { value: 'l', tag: 'alien' },
            { value: '’', tag: 'punctuation' },
            { value: 'oiseau', tag: 'alien' },
            { value: 'fait', tag: 'alien' },
            { value: 'son', tag: 'alien' },
            { value: 'nid', tag: 'alien' },
            { value: 'hit', tag: 'alien' },
            { value: 'me', tag: 'alien' },
            { value: 'up', tag: 'alien' },
            { value: 'on', tag: 'alien' },
            { value: 'my', tag: 'alien' },
            { value: 'email', tag: 'alien' },
            { value: 'Mẹ', tag: 'alien' },
            { value: 'dắt', tag: 'alien' },
            { value: 'tay', tag: 'alien' },
            { value: 'từng', tag: 'alien' },
            { value: 'bước', tag: 'alien' },
            { value: 'סכנה', tag: 'alien' },
            { value: '!', tag: 'punctuation' },
            { value: 'זאב', tag: 'alien' },
            { value: 'גוי', tag: 'alien' },
            { value: 'עצל', tag: 'alien' },
            { value: 'קפץ', tag: 'alien' },
            { value: 'דרך', tag: 'alien' },
            { value: 'מטף', tag: 'alien' },
            { value: 'שתן', tag: 'alien' },
            { value: 'חם', tag: 'alien' },
            { value: '.', tag: 'punctuation' }
        ])
    });
});
