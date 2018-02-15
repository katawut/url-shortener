// Base58
// It is just the numbers 1-9, a-z, and A-Z, giving us a total of 58 characters, hence the 58 in base58.
// It excluding 0, l, O to avoid confusion when sharing the URL over the phone or copying it manually.
const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;

// Base58 encode that unique ID to generate a unique, shorter URL
function encode(num) {
    var encoded = '';
    while (num){
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}

// Base58 decode that short url back to unique ID for get original URL
function decode(str) {
    var decoded = 0;
    while (str){
      var index = alphabet.indexOf(str[0]);
      var power = str.length - 1;
      decoded += index * (Math.pow(base, power));
      str = str.substring(1);
    }
    return decoded;
}

module.exports = {encode, decode};