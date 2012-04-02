path      = require('path')
fs        = require('fs')
RenderEco = require('./render-eco')

class HTML
  constructor: (srcPath, renderPath, htmlDelete, globalContextFile) ->
    try
      @htmlDelete   = htmlDelete
      @srcPath      = path.resolve(srcPath)
      @renderPath   = path.resolve(renderPath)
      @renderEngine = new RenderEco(@srcPath, globalContextFile)
    catch e

  compile: ->
    return unless @srcPath and @renderPath

    if @htmlDelete
      # delete existing html files
      for fn in @getFiles @renderPath, /\.html$/
        fs.unlinkSync("#{@renderPath}/#{fn}")

    # build list of pages to render
    pages = @getFiles @srcPath, /\.eco$/, /^\_\_/, /\.eco$/

    for page in pages
      # render html and save it to disk
      source = @renderEngine.render("#{page}.eco", {}, yes)
      fs.writeFileSync("#{@renderPath}/#{page}.html", source)

  getFiles: (dir, match, ignore, strip) ->
    files = []

    walk = (dir, nestedPath = '') ->
      fns = fs.readdirSync dir
      for fn in fns
        if not ignore?.test fn
          ffn = dir + '/' + fn

          if fs.statSync(ffn).isDirectory()
            walk ffn, "#{nestedPath}#{fn}/"

          else if match.test fn
            # store page path
            if not strip?
              files.push "#{nestedPath}#{fn}"
            else
              files.push "#{nestedPath}#{fn}".replace strip, ''

    walk(dir)

    files

module.exports =
  HTML: HTML
  createPackage: (srcPath, renderPath, htmlDelete, htmlGlobalContextFile) ->
    new HTML(srcPath, renderPath, htmlDelete, htmlGlobalContextFile)
