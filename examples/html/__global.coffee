module.exports =
  siteName: 'Example Site'
  pageName: null
  pageLink: (page, url, curPage) ->
    cssClass = if page is curPage then 'current' else ''
    "<a href=\"#{url}\" class=\"#{cssClass}\">#{page}</a>"
