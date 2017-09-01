var connect = require('connect');
var serveStatic = require('serve-static');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var send = require('send');

var port = argv.p || 1391;
var configFile = argv.config ? path.resolve(argv.config) : path.resolve(path.dirname(process.argv[1]), 'config.js');


var app = connect();
app.use('/config.js', function (req, res) {
    send(req, configFile).pipe(res);
});

app.use(serveStatic(__dirname));
app.listen(port);
console.log('server running on port',port);
console.log('open browser to http://localhost:'+port+'/');