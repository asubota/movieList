var express = require('express'),
 	movies = require('./routes/movies');

var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/movies', movies.findAll);
app.get('/movies/year/:year', movies.findByYear);

//app.get('/movies/:id', movies.findById);

app.listen(3000);
console.log('Listening on port 3000...');