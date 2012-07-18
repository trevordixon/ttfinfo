function ttfInfo(data) {
	try {
		var numTables = data.readUInt16BE(4);

		for (var i = 0; i < numTables; i++) {
			var o = 12 + i*16,
				tag = data.slice(o, o+4).toString();

			if (tag == 'name') {
				var ntOffset = data.readUInt32BE(o+8),
					offsetStorage = data.readUInt16BE(ntOffset+4),
					numberNameRecords = data.readUInt16BE(ntOffset+2);
				break;
			}
		}

		var storage = offsetStorage + ntOffset;

		var info = {};
		for (var j = 0; j < numberNameRecords; j++) {
			o = ntOffset + 6 + j*12;

			var platformId = data.readUInt16BE(o),
				nameId = data.readUInt16BE(o+6),
				stringLength = data.readUInt16BE(o+8),
				stringOffset = data.readUInt16BE(o+10);

			if (!info[nameId]) {
				info[nameId] = '';

				for (var k = 0; k < stringLength; k++) {
					var charCode = data[storage+stringOffset+k];
					if (charCode == 0) continue;
					info[nameId] += String.fromCharCode(charCode);
				}
			}
		}

		return info;
	} catch (err) {
		throw('Error reading ttf.');
	}
}

module.exports = function(pathOrData, cb) {
	var getData = (pathOrData instanceof Buffer) ? 
		function(data, cb) { cb(null, data); } :
		require('fs').readFile;

	getData(pathOrData, function(err, data) {
		if (err) return cb(pathOrData + ' not found.');
		try {
			var info = ttfInfo(data);
			cb(null, info);
		} catch(err) {
			cb(err);
		}
	});
};
