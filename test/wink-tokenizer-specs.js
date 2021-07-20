//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
//
//     Copyright (C) 2017-19  GRAYPE Systems Private Limited
//
//     This file is part of “wink-tokenizer”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var t = require( '../src/wink-tokenizer.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

// NOTE: Sequence of test cases is important.
describe( 'wink tokenizer', function () {
  var tokenizer = t();
  var tokenize = tokenizer.tokenize;
  var fp = tokenizer.getTokensFP;

  it( 'should tokenize a very complex sentence', function () {
    var output = [ { value: '@superman', tag: 'mention' },
                   { value: ':', tag: 'punctuation' },
                   { value: 'hit', tag: 'word' },
                   { value: 'me', tag: 'word' },
                   { value: 'up', tag: 'word' },
                   { value: 'on', tag: 'word' },
                   { value: 'my', tag: 'word' },
                   { value: 'email', tag: 'word' },
                   { value: 'r2d2@gmail.com', tag: 'email' },
                   { value: ';', tag: 'punctuation' },
                   { value: '&', tag: 'symbol' },
                   { value: 'we', tag: 'word' },
                   { value: 'will', tag: 'word' },
                   { value: 'plan', tag: 'word' },
                   { value: 'party', tag: 'word' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '<3', tag: 'emoticon' },
                   { value: '4pm', tag: 'time' },
                   { value: ':D', tag: 'emoticon' },
                   { value: '🎉', tag: 'emoji' },
                   { value: 'tom', tag: 'word' },
                   { value: 'at', tag: 'word' },
                   { value: '3pm', tag: 'time' },
                   { value: ':)', tag: 'emoticon' },
                   { value: ':)', tag: 'emoticon' },
                   { value: '#fun', tag: 'hashtag' } ];
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com; & we will plan party🎉🎉🎉 🎉  <34pm:D    🎉 tom at 3pm:):) #fun' ) ).to.deep.equal( output );
  } );

  it( 'should gnerate the finger print correctly', function () {
    expect( fp() ).to.equal( 'm:wwwwwwe;&wwwwjjjjctcjwwtcch' );
  } );

  it( 'should return an empty array with blank sentence', function () {
    expect( tokenize( '' ) ).to.deep.equal( [] );
    expect( tokenize( '  ' ) ).to.deep.equal( [] );
  } );

  it( 'should tokenize a simple sentence', function () {
    expect( tokenize( 'feeling good #FunTime' ) ).to.deep.equal( [ { value: 'feeling', tag: 'word' }, { value: 'good', tag: 'word' }, { value: '#FunTime', tag: 'hashtag' } ] );
  } );

  it( 'should gnerate the finger print correctly', function () {
    expect( fp() ).to.equal( 'wwh' );
  } );

  it( 'should tokenize a simple sentence with hashtag off', function () {
    expect( tokenizer.defineConfig( { hashtag: false } ) ).to.equal( 13 );
    expect( tokenize( 'feeling good #fun' ) ).to.deep.equal( [ { value: 'feeling', tag: 'word' }, { value: 'good', tag: 'word' }, { value: '#', tag: 'symbol' }, { value: 'fun', tag: 'word' } ] );
  } );

  it( 'should tokenize a complex sentence with full config', function () {
    var output = [ { value: '@superman', tag: 'mention' },
                   { value: ':', tag: 'punctuation' },
                   { value: 'hit', tag: 'word' },
                   { value: 'me', tag: 'word' },
                   { value: 'up', tag: 'word' },
                   { value: 'on', tag: 'word' },
                   { value: 'my', tag: 'word' },
                   { value: 'email', tag: 'word' },
                   { value: 'r2d2@gmail.com', tag: 'email' },
                   { value: ';', tag: 'punctuation' },
                   { value: '&', tag: 'symbol' },
                   { value: 'we', tag: 'word' },
                   { value: 'will', tag: 'word' },
                   { value: 'plan', tag: 'word' },
                   { value: 'party', tag: 'word' },
                   { value: '🎉', tag: 'emoji' },
                   { value: 'tom', tag: 'word' },
                   { value: 'at', tag: 'word' },
                   { value: '3pm', tag: 'time' },
                   { value: ':)', tag: 'emoticon' } ];
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com;& we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );

  it( 'should gnerate the finger print correctly for complex sentence', function () {
    expect( fp() ).to.equal( 'm:wwwwwwe;&wwwwjwwtc' );
  } );

  it( 'should tokenize a complex sentence when adding a custom regex', function () {
    var output = [ { value: '@superman', tag: 'mention' },
                   { value: ':', tag: 'punctuation' },
                   { value: 'come', tag: 'word' },
                   { value: 'help', tag: 'word' },
                   { value: 'me', tag: 'word' },
                   { value: 'out', tag: 'word' },
                   { value: 'I', tag: 'word' },
                   { value: '\'m', tag: 'word' },
                   { value: 'sick', tag: 'word' },
                   { value: '+o(', tag: 'emoticon' },
                   { value: ';', tag: 'punctuation' },
                   { value: '(oo)', tag: 'emoticon' },
                   { value: '<-', tag: 'emoticon' }
                  ];

    tokenizer.addRegex(/:\||O\.O|:`\(|\+o\(|\(oo\)|:%|:\$|>\|<|<-/gi, 'emoticon');
    expect( tokenizer.tokenize( '@superman: come help me out I\'m sick +o(; (oo) <-' ) ).to.deep.equal( output );
  } );

  it( 'should throw an error when adding a regex with an inexisting tag', function () {
    expect( function () {
      tokenizer.addRegex(/\(oo\)/gi, 'pig');
    } ).to.throw('Tag pig doesn\'t exist; Provide a \'fingerprintCode\' to add it as a tag.');
  } );

  it( 'should throw an error when adding a tag that already exists', function () {
    expect( function () {
      tokenizer.addTag('emoticon', 8);
    } ).to.throw('Tag emoticon already exists');
  } );

  it( 'should tokenize a complex sentence along with FP when adding a custom regex with a new tag', function () {
    // Expected output with custom regex.
    var output = [ { value: 'I', tag: 'word' },
                   { value: '\'m', tag: 'word' },
                   { value: 'thinking', tag: 'word' },
                   { value: 'why', tag: 'word' },
                   { value: 'superman', tag: 'superman' },
                   { value: '\'', tag: 'punctuation' },
                   { value: 's', tag: 'word' },
                   { value: 'dead', tag: 'word' },
                   { value: '?', tag: 'punctuation' },
                   { value: '!', tag: 'punctuation' }
                  ];

    // Expected output after a defineConfig() call.
    var output1 = [ { value: 'I', tag: 'word' },
                   { value: '\'m', tag: 'word' },
                   { value: 'thinking', tag: 'word' },
                   { value: 'why', tag: 'word' },
                   { value: 'superman', tag: 'word' },
                   { value: '\'s', tag: 'word' },
                   { value: 'dead', tag: 'word' },
                   { value: '?', tag: 'punctuation' },
                   { value: '!', tag: 'punctuation' }
                  ];
    // Add custome regex/tag/fp.
    tokenizer.addRegex(/superman/gi, 'superman', 's');
    // Test tokenization.
    expect( tokenizer.tokenize( 'I\'m thinking why superman\'s dead ?!' ) ).to.deep.equal( output );
    // Test finger printing.
    expect( tokenizer.getTokensFP() ).to.deep.equal( 'wwwws\'ww?!' );
    // Call defineConfig to reset the above.
    tokenizer.defineConfig( { word: true } );
    // Repeat the above tests to confirm the effect of reset.
    expect( tokenizer.tokenize( 'I\'m thinking why superman\'s dead ?!' ) ).to.deep.equal( output1 );
    expect( tokenizer.getTokensFP() ).to.deep.equal( 'wwwwwww?!' );
  } );

  it( 'should tokenize a complex sentence with empty config', function () {
    var output = [ { value: '@superman:', tag: 'alien' },
                   { value: 'hit', tag: 'alien' },
                   { value: 'me', tag: 'alien' },
                   { value: 'up', tag: 'alien' },
                   { value: 'on', tag: 'alien' },
                   { value: 'my', tag: 'alien' },
                   { value: 'email', tag: 'alien' },
                   { value: 'r2d2@gmail.com;', tag: 'alien' },
                   { value: '&', tag: 'alien' },
                   { value: 'we', tag: 'alien' },
                   { value: 'will', tag: 'alien' },
                   { value: 'plan', tag: 'alien' },
                   { value: 'party🎉', tag: 'alien' },
                   { value: 'tom', tag: 'alien' },
                   { value: 'at', tag: 'alien' },
                   { value: '3pm:)', tag: 'alien' } ];
    expect( tokenizer.defineConfig( {} ) ).to.equal( 0 );
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com;  & we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a complex sentence with possessive & aposrtophy stuff', function () {
    var output = [ { value: 'She', tag: 'word' },
                   { value: 'was', tag: 'word' },
                   { value: 'n\'t', tag: 'word' },
                   { value: 'at', tag: 'word' },
                   { value: 'home', tag: 'word' },
                   { value: 'and', tag: 'word' },
                   { value: 'wild', tag: 'word' },
                   { value: 'cats', tag: 'word' },
                   { value: '\'', tag: 'word' },
                   { value: 'ate', tag: 'word' },
                   { value: 'her', tag: 'word' },
                   { value: 'dog', tag: 'word' },
                   { value: '\'s', tag: 'word' },
                   { value: 'food', tag: 'word' } ];
    expect( t().tokenize( 'She wasn\'t at home and wild cats\' ate her dog\'s food' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence with multiple contractions & containing extra spaces', function () {
    var output = [ { value: 'I', tag: 'word' },
                   { value: '\'ll', tag: 'word' },
                   { value: 'eat', tag: 'word' },
                   { value: 'John', tag: 'word' },
                   { value: '\'s', tag: 'word' },
                   { value: 'food', tag: 'word' },
                   { value: 'today', tag: 'word' },
                   { value: 'with', tag: 'word' },
                   { value: 'O\'kelly', tag: 'word' } ];
    expect( t().tokenize( '     I\'ll eat      John\'s food today with O\'kelly  ' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence with words with diacritical marks', function () {
    var output = [ { value: 'Zoë', tag: 'word' },
                   { value: 'submitted', tag: 'word' },
                   { value: 'her', tag: 'word' },
                   { value: 'résumé', tag: 'word' },
                   { value: '🎉', tag: 'emoji' },
                   { value: 'in', tag: 'word' },
                   { value: 'Nestlé', tag: 'word' },
                   { value: ':-)', tag: 'emoticon' } ];
    expect( t().tokenize( 'Zoë submitted her résumé🎉 in Nestlé:-)' ) ).to.deep.equal( output );
  } );


  it( 'should tokenize a sentence containing lots of currency symbols', function () {
    var output = [ { value: 'I', tag: 'word' },
                   { value: 'have', tag: 'word' },
                   { value: '$', tag: 'currency' },
                   { value: '200.0', tag: 'number' },
                   { value: '₿', tag: 'currency' },
                   { value: '2.0', tag: 'number' },
                   { value: 'is', tag: 'word' },
                   { value: '1', tag: 'number' },
                   { value: '%', tag: 'symbol' },
                   { value: ';', tag: 'punctuation' },
                   { value: '₽', tag: 'currency' },
                   { value: '100', tag: 'number' },
                   { value: '₹', tag: 'currency' },
                   { value: '200', tag: 'number' },
                   { value: '₨', tag: 'currency' },
                   { value: '300', tag: 'number' },
                   { value: '>', tag: 'symbol' },
                   { value: '>', tag: 'symbol' },
                   { value: '$', tag: 'currency' },
                   { value: '10000.00', tag: 'number' },
                   { value: ';', tag: 'punctuation' },
                   { value: '&', tag: 'symbol' },
                   { value: '£', tag: 'currency' },
                   { value: '2', tag: 'number' },
                   { value: '¥', tag: 'currency' },
                   { value: '0.5', tag: 'number' },
                   { value: '€', tag: 'currency' },
                   { value: '1.2', tag: 'number' },
                   { value: '₩', tag: 'currency' },
                   { value: '1', tag: 'number' },
                   { value: ':-)', tag: 'emoticon' } ];
    expect( t().tokenize( 'I have$200.0 ₿2.0 is 1%; ₽100₹200₨300 >> $10000.00; & £2 ¥0.5 €1.2₩1:-)' ) ).to.deep.equal( output );
  } );
  it( 'should tokenize multi-script complex sentence', function () {
    var output = [ { value: 'दिग्गज', tag: 'word' },
                   { value: 'शायर', tag: 'word' },
                   { value: 'मिर्ज़ा', tag: 'word' },
                   { value: '#Ghalib', tag: 'hashtag' },
                   { value: 'की', tag: 'word' },
                   { value: 'पुण्यतिथि', tag: 'word' },
                   { value: '(', tag: 'punctuation' },
                   { value: '27', tag: 'number' },
                   { value: 'December', tag: 'word' },
                   { value: '१७९७', tag: 'number' },
                   { value: ')', tag: 'punctuation' },
                   { value: 'पर', tag: 'word' },
                   { value: 'उनका', tag: 'word' },
                   { value: 'किरदार', tag: 'word' },
                   { value: 'अदा', tag: 'word' },
                   { value: 'करने', tag: 'word' },
                   { value: 'वाले', tag: 'word' },
                   { value: '@NaseerudinShah', tag: 'mention' },
                   { value: 'ने', tag: 'word' },
                   { value: 'क्या', tag: 'word' },
                   { value: 'कहा', tag: 'word' },
                   { value: ',', tag: 'punctuation' },
                   { value: 'आप', tag: 'word' },
                   { value: 'भी', tag: 'word' },
                   { value: 'सुनिए', tag: 'word' },
                   { value: '👂', tag: 'emoji' },
                   { value: '।', tag: 'punctuation' },
                   { value: ':p', tag: 'emoticon' } ];
    expect( t().tokenize( 'दिग्गज शायर मिर्ज़ा #Ghalib की पुण्यतिथि (27 December १७९७) पर उनका किरदार अदा करने वाले @NaseerudinShah ने क्या कहा, आप भी सुनिए👂।:p' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize sanskrit gayatri mantra', function () {
    var output = [ { value: 'ॐ', tag: 'symbol' },
                   { value: 'भूर्भुवः', tag: 'word' },
                   { value: 'स्वः', tag: 'word' },
                   { value: '।', tag: 'punctuation' },
                   { value: 'तत्स॑वि॒तुर्वरेण्यं॒', tag: 'word' },
                   { value: 'भर्गो॑', tag: 'word' },
                   { value: 'दे॒वस्य॑धीमहि', tag: 'word' },
                   { value: '।', tag: 'punctuation' },
                   { value: 'धियो॒', tag: 'word' },
                   { value: 'यो', tag: 'word' },
                   { value: 'नः॑', tag: 'word' },
                   { value: 'प्रचो॒दया॑त्', tag: 'word' },
                   { value: '॥', tag: 'punctuation' } ];
    expect( t().tokenize( 'ॐ भूर्भुवः स्वः । तत्स॑वि॒तुर्वरेण्यं॒ भर्गो॑ दे॒वस्य॑धीमहि । धियो॒ यो नः॑ प्रचो॒दया॑त् ॥' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a marathi tweet', function () {
    var output = [ { value: 'आजचे', tag: 'word' },
                   { value: '#ट्विटव्याख्यान', tag: 'hashtag' },
                   { value: '#ट्विटरसंमेलन', tag: 'hashtag' },
                   { value: 'विषय', tag: 'word' },
                   { value: ':', tag: 'punctuation' },
                   { value: '"छंद: एक आयुष्याची शैली"', tag: 'quoted_phrase' },
                   { value: 'वेळ', tag: 'word' },
                   { value: ':', tag: 'punctuation' },
                   { value: 'रात्री', tag: 'word' },
                   { value: '.', tag: 'punctuation' },
                   { value: '९.००', tag: 'number' },
                   { value: 'ते', tag: 'word' },
                   { value: '१०.००', tag: 'number' },
                   { value: 'वक्ते', tag: 'word' },
                   { value: ':', tag: 'punctuation' },
                   { value: '@hifrom_vinit', tag: 'mention' } ];
    const tknzr = t();
    expect( tknzr.defineConfig( { quoted_phrase: true } ) ).to.equal( 14 ); // eslint-disable-line camelcase
    expect( tknzr.tokenize( 'आजचे #ट्विटव्याख्यान #ट्विटरसंमेलन विषय: "छंद: एक आयुष्याची शैली" वेळ: रात्री. ९.०० ते १०.०० वक्ते: @hifrom_vinit' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize different number formats & ordinals', function () {
    var output = [ { value: '९.००', tag: 'number' },
                   { value: 'ते', tag: 'word' },
                   { value: '१०.००', tag: 'number' },
                   { value: '३,१२.४५६-७', tag: 'number' },
                   { value: 'funny', tag: 'word' },
                   { value: 'format', tag: 'word' },
                   { value: '!', tag: 'punctuation' },
                   { value: '2nd', tag: 'ordinal' },
                   { value: '33', tag: 'number' },
                   { value: 'th', tag: 'word' },
                   { value: '1', tag: 'number' },
                   { value: '2nd', tag: 'ordinal' },
                   { value: '11th', tag: 'ordinal' },
                   { value: '93rd', tag: 'ordinal' },
                   { value: '.', tag: 'punctuation' },
                   { value: 'my', tag: 'word' },
                   { value: '1st', tag: 'ordinal' },
                   { value: 'ever', tag: 'word' },
                   { value: 'ip', tag: 'word' },
                   { value: 'is', tag: 'word' },
                   { value: '8,8.8-8', tag: 'number' } ];
    expect( t().tokenize( '९.०० ते १०.०० ३,१२.४५६-७funny format! 2nd 33th 12nd 11th 93rd. my 1st ever ip is 8,8.8-8' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a contractions (pronoun, verb & name) heavy sentence', function () {
    var output = [ { value: 'We', tag: 'word' },
                   { value: '\'ll', tag: 'word' },
                   { value: 'help', tag: 'word' },
                   { value: 'you', tag: 'word' },
                   { value: 'if', tag: 'word' },
                   { value: 'you', tag: 'word' },
                   { value: 'wo', tag: 'word' },
                   { value: 'n\'t', tag: 'word' },
                   { value: 'create', tag: 'word' },
                   { value: 'trouble', tag: 'word' },
                   { value: ',', tag: 'punctuation' },
                   { value: 'Jamie', tag: 'word' },
                   { value: 'O\'Hara', tag: 'word' } ];
    expect( t().tokenize( 'We\'ll help you if you won\'t create trouble, Jamie O\'Hara' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize quoted stuff correctly with defualt config', function () {
    var output = [ { value: 'He', tag: 'word' },
                   { value: 'said', tag: 'word' },
                   { value: ',', tag: 'punctuation' },
                   { value: '"', tag: 'punctuation' },
                   { value: 'you', tag: 'word' },
                   { value: 'are', tag: 'word' },
                   { value: 'great', tag: 'word' },
                   { value: '!', tag: 'punctuation' },
                   { value: '"', tag: 'punctuation' } ];
    expect( t().tokenize( 'He said, "you are great!"' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize / as symbol', function () {
    var output = [ { value: 'He', tag: 'word' },
                   { value: 'said', tag: 'word' },
                   { value: ',', tag: 'punctuation' },
                   { value: '"', tag: 'punctuation' },
                   { value: 'buy', tag: 'word' },
                   { value: 'two', tag: 'word' },
                   { value: '/', tag: 'symbol' },
                   { value: 'three', tag: 'word' },
                   { value: 'apples', tag: 'word' },
                   { value: '"', tag: 'punctuation' } ];
    expect( t().tokenize( 'He said, "buy two/three apples"' ) ).to.deep.equal( output );
  } );


  it( 'should tokenize more punctuations', function () {
    var output = [ { value: 'Here', tag: 'word' },
                   { value: '»', tag: 'punctuation' },
                   { value: '«', tag: 'punctuation' },
                   { value: '»', tag: 'punctuation' },
                   { value: '«', tag: 'punctuation' },
                  ];
    expect( t().tokenize( 'Here »« » «' ) ).to.deep.equal( output );
  } );
} );
