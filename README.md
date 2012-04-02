# hem-render-html

This module adds html rendering support to hem (Bundler for Node/CommonJS/Web Apps). Currently it
only uses `.eco` templates but in the future I will make it pluggable. I created this module to
allow myself the ability to create my static html pages dynamically. I wanted to be able to create a
header and footer partial template used for all static pages in my site.

## Usage

1. Add `hem-render-html` and `eco` to the dependencies in your `package.json` file in the root
   directory of your hem project. Here is an example:

    ```
    {
      "name": "hem-render-html-example",
      "version": "0.0.2",
      "dependencies": {
        "serveup": "~0.0.4",
        "hem": "~0.1.7",
        "eco": "1.1.0-rc-3",
        "es5-shimify": "~0.0.1",
        "json2ify": "~0.0.1",
        "jqueryify": "~0.0.1",
        "spine": "~1.0.6"
      }
    }
    ```

1. Once hem-render-html is added to your dependencies run the following command from your project
   root:

    ```
    npm install .
    ```

1. Add a `slug.js` file to the root of your project with the following:

    ```
    var hem  = new (require('../lib/hem-render-html'));
    var argv = process.argv.slice(2);

    hem.exec(argv[0]);
    ```

1. Add your html templates and global context file.

    ### Template Files

    hem-render-html is setup to generate html files for all files within the html dir that have an
    `.eco` file extension. The one exception is if the filename starts with two underscores `__`.
    This convention allows us to easily create partial templates that can be used in full page
    templates. For example I commonly have `__header.eco` and `__footer.eco` partial templates. For
    a good example of this in a project you can look in the `examples` folder of this repo.

    ### Render Helper

    To render another template (most commonly a partial template like `__header.eco`) from within
    another template you use the `render` helper. Here is an example use of the `render` helper with
    a local context object passed in:

    ```
    <%- @render "__header.eco", {pageName: 'Home'} %>
    ```

    Below is information on the global and local context objects that are available to templates.

    ### Global Context

    hem-render-html loads a global context file before it renders an html page. This allows you to
    set global data and helpers available from all your templates. This file is located in the root
    of the html folder and is named `__global.coffee`. The object exported from this module is then
    available to all templates.

    ### Local Context

    When rendering a partial template with the `render` helper you can pass a local context. This
    local context holds values specific to the template being rendered. By default these local
    context values are merged with the global context values (the local context values override
    global context values when merged).

    The `render` helper does have an optional third boolean argument `includeGlobalContext`. This
    argument is default `on` which merges the local context with the global context. If you do not
    want your partial template's context object to include the global context values you can set
    this to `off`. When `off` only the values in the local context are passed to the template. Here
    is an example `render` helper with `includeGlobalContext` off:

    ```
    <%- @render "__footer.eco", {}, off %>
    ```

1. Use it! Now when you run hem in your project root it will generate html files for your html
   templates. For example to bunlde your app run:

    ```hem bundle```

    Or run the development server:

    ```hem server```
