var express	= require('express'),
	path	= require('path'),
	http	= require('http'),
	movies	= require('./routes/movies');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3001);
	app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, 'public')));
});


// movie calls
app.get('/',							movies.findMovieAll);
app.get('/movie',						movies.findMovieAll);
app.get('/movie/:id',					movies.findMovieById);
app.get('/movie/year/:value',			movies.findMovieByYear);
app.get('/movie/director/:value',		movies.findMovieByDirector);
app.get('/movie/genre/:value',			movies.findMovieByGenre);
app.get('/movie/country/:value',		movies.findMovieByCountry);

app.get('/director',					movies.findDirectorAll);
app.get('/genre',						movies.findGenreAll);
app.get('/actor',						movies.findActorAll);
app.get('/country',						movies.findCountryAll);
app.get('/year',						movies.findYearAll);

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});