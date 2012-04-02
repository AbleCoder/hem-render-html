(function() {
  var HTML, RenderEco, fs, path;

  path = require('path');

  fs = require('fs');

  RenderEco = require('./render-eco');

  HTML = (function() {

    function HTML(srcPath, renderPath) {
      try {
        this.srcPath = path.resolve(srcPath);
        this.renderPath = path.resolve(renderPath);
        this.renderEngine = new RenderEco(this.srcPath);
      } catch (e) {

      }
    }

    HTML.prototype.compile = function() {
      var fn, page, pages, source, _i, _j, _len, _len2, _ref, _results;
      if (!(this.srcPath && this.renderPath)) return;
      _ref = this.getFiles(this.renderPath, /\.html$/);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        fs.unlinkSync("" + this.renderPath + "/" + fn);
      }
      pages = this.getFiles(this.srcPath, /\.eco$/, /^\_\_/, /\.eco$/);
      _results = [];
      for (_j = 0, _len2 = pages.length; _j < _len2; _j++) {
        page = pages[_j];
        source = this.renderEngine.render("" + page + ".eco", {}, true);
        _results.push(fs.writeFileSync("" + this.renderPath + "/" + page + ".html", source));
      }
      return _results;
    };

    HTML.prototype.getFiles = function(dir, match, ignore, strip) {
      var files, walk;
      files = [];
      walk = function(dir, nestedPath) {
        var ffn, fn, fns, _i, _len, _results;
        if (nestedPath == null) nestedPath = '';
        fns = fs.readdirSync(dir);
        _results = [];
        for (_i = 0, _len = fns.length; _i < _len; _i++) {
          fn = fns[_i];
          if (!(ignore != null ? ignore.test(fn) : void 0)) {
            ffn = dir + '/' + fn;
            if (fs.statSync(ffn).isDirectory()) {
              _results.push(walk(ffn, "" + nestedPath + fn + "/"));
            } else if (match.test(fn)) {
              if (!(strip != null)) {
                _results.push(files.push("" + nestedPath + fn));
              } else {
                _results.push(files.push(("" + nestedPath + fn).replace(strip, '')));
              }
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      walk(dir);
      return files;
    };

    return HTML;

  })();

  module.exports = {
    HTML: HTML,
    createPackage: function(srcPath, renderPath) {
      return new HTML(srcPath, renderPath);
    }
  };

}).call(this);
