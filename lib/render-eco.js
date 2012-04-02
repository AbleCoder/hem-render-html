(function() {
  var RenderEco, eco, fs, path,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  eco = require('eco');

  fs = require('fs');

  path = require('path');

  RenderEco = (function() {

    RenderEco.prototype.globalContext = {};

    RenderEco.prototype.srcPath = '';

    function RenderEco(srcPath, globalContextFile) {
      if (globalContextFile == null) globalContextFile = '__global.coffee';
      this.render = __bind(this.render, this);
      this.srcPath = srcPath;
      path = require.resolve("" + this.srcPath + "/" + globalContextFile);
      delete require.cache[path];
      this.globalContext = require(path);
    }

    RenderEco.prototype.render = function(templateFile, localContext, includeGlobalContext) {
      var context, k, template, v, _ref;
      if (localContext == null) localContext = {};
      if (includeGlobalContext == null) includeGlobalContext = true;
      context = {};
      if (includeGlobalContext) {
        _ref = this.globalContext;
        for (k in _ref) {
          v = _ref[k];
          context[k] = v;
        }
      }
      for (k in localContext) {
        v = localContext[k];
        context[k] = v;
      }
      context['render'] = this.render;
      template = fs.readFileSync("" + this.srcPath + "/" + templateFile, 'utf-8');
      return eco.render(template, context);
    };

    return RenderEco;

  })();

  module.exports = RenderEco;

}).call(this);
