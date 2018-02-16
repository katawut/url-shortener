/** base58
 * This module is for encode number to encoded string for use to as shorter URL and
 * decode shorter URL back to number for as key to find the url entry in database.
 * base58 mean the numbers 1-9, a-z, and A-Z, giving us a total of 58 characters, hence the 58 in base58.
 * It excluding 0, l, O to avoid confusion when sharing the URL over the phone or copying it manually.
 */

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;

// base58 encode that unique ID to generate a unique, shorter URL
function encode(num) {
    var encoded = '';
    while (num){
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}

// Base58 decode that shorter URL back to unique ID for find the url entry in database.
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