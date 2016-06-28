import fs from 'fs';
import path from 'path';

module.exports = function(server) {
  return fs.readdir(__dirname, function(err, files) {
    return files.forEach(function(e) {
      var basename, ext, i, len, ref, results, route;
      ext = path.extname(e).toLowerCase();
      basename = path.basename(e, ext).toLowerCase();
      if (basename === 'index') {
        return;
      }
      ref = require('./' + basename);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        route = ref[i];
        results.push(server.route(route));
      }
      return results;
    });
  });
};