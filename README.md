# ttfinfo

Extracts metadata from a ttf file. Ported from PHP at http://stackoverflow.com/questions/5668901/php-how-to-read-title-of-font-from-ttf-file.

Use like:

    var ttfInfo = require('ttfinfo');
    ttfInfo('Fonts/Aaargh.ttf', function(err, info) {
         console.log(info);
    });

As an alternative to providing a path to your ttf file, you can pass in a buffer.
