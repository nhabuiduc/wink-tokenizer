var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('he - Hebrew', function () {
    var tokenizer = t("he");
    it('should tokenize a sentence in Hebrew', function () {
        const rs = tokenizer.tokenize(`איך נטוס עם גד כץ, הזקן שמֻחלף בצרפת?
        עטלף אבק נס דרך מזגן שהתפוצץ כי חם.
        כהרף־עין נשבט לךָ גוץ צְמֵא־דם. תְּפֹס חָזָק!
        מנעולן הפך כף חצץ שגזר קט איבד סתם.
        מחבל קנטרן שזעף פצץ אגד וכך הסתים.
        סכנה! זאב גוי עצל קפץ דרך מטף שתן חם.`);
        
        expect(rs).to.deep.equal([
            { value: 'איך', tag: 'word' },
            { value: 'נטוס', tag: 'word' },
            { value: 'עם', tag: 'word' },
            { value: 'גד', tag: 'word' },
            { value: 'כץ', tag: 'word' },
            { value: ',', tag: 'punctuation' },
            { value: 'הזקן', tag: 'word' },
            { value: 'שמֻחלף', tag: 'word' },
            { value: 'בצרפת', tag: 'word' },
            { value: '?', tag: 'punctuation' },
            { value: 'עטלף', tag: 'word' },
            { value: 'אבק', tag: 'word' },
            { value: 'נס', tag: 'word' },
            { value: 'דרך', tag: 'word' },
            { value: 'מזגן', tag: 'word' },
            { value: 'שהתפוצץ', tag: 'word' },
            { value: 'כי', tag: 'word' },
            { value: 'חם', tag: 'word' },
            { value: '.', tag: 'punctuation' },
            { value: 'כהרף־עין', tag: 'word' },
            { value: 'נשבט', tag: 'word' },
            { value: 'לךָ', tag: 'word' },
            { value: 'גוץ', tag: 'word' },
            { value: 'צְמֵא־דם', tag: 'word' },
            { value: '.', tag: 'punctuation' },
            { value: 'תְּפֹס', tag: 'word' },
            { value: 'חָזָק', tag: 'word' },
            { value: '!', tag: 'punctuation' },
            { value: 'מנעולן', tag: 'word' },
            { value: 'הפך', tag: 'word' },
            { value: 'כף', tag: 'word' },
            { value: 'חצץ', tag: 'word' },
            { value: 'שגזר', tag: 'word' },
            { value: 'קט', tag: 'word' },
            { value: 'איבד', tag: 'word' },
            { value: 'סתם', tag: 'word' },
            { value: '.', tag: 'punctuation' },
            { value: 'מחבל', tag: 'word' },
            { value: 'קנטרן', tag: 'word' },
            { value: 'שזעף', tag: 'word' },
            { value: 'פצץ', tag: 'word' },
            { value: 'אגד', tag: 'word' },
            { value: 'וכך', tag: 'word' },
            { value: 'הסתים', tag: 'word' },
            { value: '.', tag: 'punctuation' },
            { value: 'סכנה', tag: 'word' },
            { value: '!', tag: 'punctuation' },
            { value: 'זאב', tag: 'word' },
            { value: 'גוי', tag: 'word' },
            { value: 'עצל', tag: 'word' },
            { value: 'קפץ', tag: 'word' },
            { value: 'דרך', tag: 'word' },
            { value: 'מטף', tag: 'word' },
            { value: 'שתן', tag: 'word' },
            { value: 'חם', tag: 'word' },
            { value: '.', tag: 'punctuation' }
          ]);
    });
});
