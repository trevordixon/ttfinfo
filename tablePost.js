
const table = require('./table');

const FORMAT_OFFSET             = 0,
      ITALIC_ANGLE_OFFSET       = FORMAT_OFFSET + 4;
      UNDERLINE_POSITION_OFFSET = ITALIC_ANGLE_OFFSET + 8,
      UNDERLINE_THICKNESS_OFFSET = UNDERLINE_POSITION_OFFSET + 2;
      IS_FIXED_PITCH_OFFSET      = UNDERLINE_THICKNESS_OFFSET + 2;

var fixed16dot16 = function(fixed) {
  if (fixed & 0x80000000) {
    // negative number is stored in two's complement
    fixed = -(~fixed + 1);
  }

  return fixed / 65536;
}


module.exports = function(data) {
  var o = table.offset(data, 'post');
  return {
    format            : fixed16dot16(data.readUInt32BE(o+FORMAT_OFFSET)),
    italicAngle       : fixed16dot16(data.readUInt32BE(o+ITALIC_ANGLE_OFFSET)),
    underlinePosition : data.readInt16BE(o+UNDERLINE_POSITION_OFFSET),
    underlineThickness: data.readInt16BE(o+UNDERLINE_THICKNESS_OFFSET),
    isFixedPitch      : data.readUInt32BE(o+IS_FIXED_PITCH_OFFSET),
    minMemType42      : data.readUInt32BE(o+7),
    maxMemType42      : data.readUInt32BE(o+9),
    minMemType1       : data.readUInt32BE(o+11),
    maxMemType1       : data.readUInt32BE(o+13)
  };
}


