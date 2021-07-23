var chai = require('chai');
var mocha = require('mocha');
var t = require('../../src/wink-tokenizer.js');

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe('vi - Vietnamese', function () {
    var tokenizer = t("vi");
    

    it("tokenizer", () => {
        var text = `
    Hương rừng thơm đồi vắng 
    Nước suối trong thầm thì 
    Cọ xòe ô che nắng 
    Râm mát đường em đi
    
    Hôm qua em tới trường 
    Mẹ dắt tay từng bước 
    Hôm nay mẹ lên nương 
    Một mình em đến lớp 
    Chim đùa theo trong lá
    Cá dưới khe thì thào
    Hương rừng chen hương cốm
    Em tới trường hương theo
    
    Trường của em be bé 
    Nằm lặng giữa rừng cây 
    Cô giáo em tre trẻ 
    Dạy em hát rất hay 
    Hương rừng thơm đồi vắng 
    Nước suối trong thầm thì 
    Cọ xòe ô che nắng 
    Râm mát đường em đi`;
        expect(tokenizer.tokenize(text)).to.deep.equal(text.split(/[\n\r\s]+/).filter((f) => f).map((f) => ({ value: f, tag: 'word' })));
    })
});
