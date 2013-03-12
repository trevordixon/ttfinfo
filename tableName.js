
const table = require('./table');


module.exports = function(data) {
  var ntOffset = table.offset(data, 'name'),
      offsetStorage = data.readUInt16BE(ntOffset+4),
      numberNameRecords = data.readUInt16BE(ntOffset+2);

  var storage = offsetStorage + ntOffset;

  var info = {};
  for (var j = 0; j < numberNameRecords; j++) {
    var o = ntOffset + 6 + j*12;

    var platformId = data.readUInt16BE(o),
      nameId = data.readUInt16BE(o+6),
      stringLength = data.readUInt16BE(o+8),
      stringOffset = data.readUInt16BE(o+10);

    if (!info[nameId]) {
      info[nameId] = '';

      for (var k = 0; k < stringLength; k++) {
        var charCode = data[storage+stringOffset+k];
        if (charCode === 0) continue;
        info[nameId] += String.fromCharCode(charCode);
      }
    }
  }

  return info;
};

