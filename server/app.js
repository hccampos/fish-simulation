var express = require('express');
var serveStatic = require('serve-static');
var http = require('http');

var app = express();
app.use(serveStatic('build', { 'index': ['index.html'] }));

//------------------------------------------------------------------------------

var server = http.createServer(app);

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
	console.log("Listening on " + port);
});