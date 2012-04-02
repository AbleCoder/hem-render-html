module.exports =
  siteName: 'Example Site'
  pageName: null
  pageLink: (page, url, curPage) ->
    cssClass = if page is curPage then 'current' else ''
    console.log cssClass
    "<a href=\"#{url}\" class=\"#{cssClass}\">#{page}</a>"
