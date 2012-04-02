eco  = require 'eco'
fs   = require 'fs'
path = require 'path'

class RenderEco
  globalContext: {}
  srcPath: ''

  constructor: (srcPath, globalContextFile = '__global.coffee') ->
    @srcPath = srcPath

    # load global context
    path = require.resolve "#{@srcPath}/#{globalContextFile}"
    delete require.cache[path]
    @globalContext = require(path)

  render: (templateFile, localContext = {}, includeGlobalContext = no) =>
    if includeGlobalContext
      context = @globalContext
      context[k] = v for k, v of localContext
    else
      context = localContext

    # add render helper to context
    context['render'] = @render

    # read in template file
    template = fs.readFileSync "#{@srcPath}/#{templateFile}", 'utf-8'

    # render template and return it
    eco.render template, context

module.exports = RenderEco
