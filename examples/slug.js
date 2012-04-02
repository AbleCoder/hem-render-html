var hem  = new (require('hem-render-html'));
var argv = process.argv.slice(2);

hem.exec(argv[0]);
