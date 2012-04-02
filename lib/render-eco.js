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
      var context, k, template, v;
      if (localContext == null) localContext = {};
      if (includeGlobalContext == null) includeGlobalContext = false;
      if (includeGlobalContext) {
        context = this.globalContext;
        for (k in localContext) {
          v = localContext[k];
          context[k] = v;
        }
      } else {
        context = localContext;
      }
      context['render'] = this.render;
      template = fs.readFileSync("" + this.srcPath + "/" + templateFile, 'utf-8');
      return eco.render(template, context);
    };

    return RenderEco;

  })();

  module.exports = RenderEco;

}).call(this);
