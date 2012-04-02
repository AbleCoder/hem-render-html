var hem  = new (require('../lib/hem-render-html'));
var argv = process.argv.slice(2);

//hem.compilers.less = require('hem-render-html').compiler;

hem.exec(argv[0]);
