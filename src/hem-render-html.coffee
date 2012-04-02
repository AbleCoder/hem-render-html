Hem  = require('hem')
fs   = require('fs')
html = require('./html')
path = require('path')

class HemRenderHtml extends Hem
  htmlOptions:
    html: './html'
    htmlDelete: on
    htmlPath: './public'

  constructor: (options = {}) ->
    @htmlOptions[key] = value for key, value of options

    super @htmlOptions

  server: ->
    @watchHtml()
    super

  build: ->
    @buildHtml()
    super

  buildHtml: ->
    if path.existsSync(@options.html)
        @htmlPackage().compile()

  watch: ->
    @watchHtml()
    super

  watchHtml: ->
    @buildHtml()
    dir = path.dirname(@options.html)
    if path.existsSync(dir)
      require('watch').watchTree dir, (file, curr, prev) =>
        if curr and (curr.nlink is 0 or +curr.mtime isnt +prev?.mtime)
          console.log "#{file} changed.  Rebuilding all HTML files."
          @buildHtml()

  htmlPackage: ->
    html.createPackage(@options.html, @options.htmlPath)

module.exports = HemRenderHtml
