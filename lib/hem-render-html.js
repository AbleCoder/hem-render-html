(function() {
  var Hem, HemRenderHtml, fs, html, path,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Hem = require('hem');

  fs = require('fs');

  html = require('./html');

  path = require('path');

  HemRenderHtml = (function(_super) {

    __extends(HemRenderHtml, _super);

    HemRenderHtml.prototype.htmlOptions = {
      html: './html',
      htmlDelete: true,
      htmlPath: './public'
    };

    function HemRenderHtml(options) {
      var key, value;
      if (options == null) options = {};
      for (key in options) {
        value = options[key];
        this.htmlOptions[key] = value;
      }
      HemRenderHtml.__super__.constructor.call(this, this.htmlOptions);
    }

    HemRenderHtml.prototype.server = function() {
      this.watchHtml();
      return HemRenderHtml.__super__.server.apply(this, arguments);
    };

    HemRenderHtml.prototype.build = function() {
      this.buildHtml();
      return HemRenderHtml.__super__.build.apply(this, arguments);
    };

    HemRenderHtml.prototype.buildHtml = function() {
      if (path.existsSync(this.options.html)) return this.htmlPackage().compile();
    };

    HemRenderHtml.prototype.watch = function() {
      this.watchHtml();
      return HemRenderHtml.__super__.watch.apply(this, arguments);
    };

    HemRenderHtml.prototype.watchHtml = function() {
      var dir,
        _this = this;
      this.buildHtml();
      dir = path.dirname(this.options.html);
      if (path.existsSync(dir)) {
        return require('watch').watchTree(dir, function(file, curr, prev) {
          if (curr && (curr.nlink === 0 || +curr.mtime !== +(prev != null ? prev.mtime : void 0))) {
            console.log("" + file + " changed.  Rebuilding all HTML files.");
            return _this.buildHtml();
          }
        });
      }
    };

    HemRenderHtml.prototype.htmlPackage = function() {
      return html.createPackage(this.options.html, this.options.htmlPath);
    };

    return HemRenderHtml;

  })(Hem);

  module.exports = HemRenderHtml;

}).call(this);
