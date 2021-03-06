// for error logging
const debug = require('debug')
const name = 'olioli'
debug('booting %s', name)

// initialize
var express = require('express'), http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

// utilize routes folder
var routes = require('./routes');
//app.set('routes', path.join(__dirname, 'routes'));

// Set view engine for app
app.set('view engine', 'ejs');
app.use("/styles", express.static(__dirname + "/styles"));
app.use("/images", express.static(__dirname + "/images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// load text for pages
app.locals.appdata    = require('./data/data.json');
app.locals.blog       = require('./data/blog.json');
app.locals.playground = require('./data/playground.json');

// Set pages
app.get('/', routes.index);
app.get('/playground', routes.playground);
app.get('/blog', routes.blog);

app.get('*', routes.wrong);

var server = http.createServer(app);

app.listen(port);
