var tokenizer = require('./src/wink-tokenizer');
var indexing = require("./indexing");
var myTokenizer = tokenizer();

var s = '@superman: here-he-is hit me up i\'ve known on my email r2d2@gmail.com, 2 of us plan party🎉 ở nhà Nhã tom at 3pm:) #fun \"this is good\"';
var arr = myTokenizer.tokenize(s);
var result = indexing(s, arr);
console.log(result);