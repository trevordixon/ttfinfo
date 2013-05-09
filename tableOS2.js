const table = require('./table');

const VERSION_OFFSET = 0,
      WEIGHT_CLASS_OFFSET = 4;

module.exports = function(data) {
  var o = table.offset(data, 'OS/2');
  return {
    version           : data.readUInt16BE(o+VERSION_OFFSET),
    weightClass       : data.readUInt16BE(o+WEIGHT_CLASS_OFFSET)
  };
};

