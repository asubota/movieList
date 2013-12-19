var express = require('express'),
	path 	= require('path'),
	http 	= require('http'),
	movies  = require('./routes/movies');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3001);
	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', movies.findAll);
app.get('/movies', movies.findAll);
app.get('/movies/year/:year', movies.findByYear);

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});