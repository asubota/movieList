var mongo = require('mongodb');
var _     = require('underscore');

var Server  = mongo.Server,
    Db      = mongo.Db,
    BSON    = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('movieList', server, {safe:false});

db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'movies' database");
        db.collection('movies', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'movies' collection doesn't exist. Create it with sample data... !");
            }
        });
    }
});

exports.findMovieAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.first(items, 180);

            res.send(result);
        });
    });
};

exports.findMovieById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving movie by id: ' + id);
    db.collection('movies', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findMovieByYear = function(req, res) {
    var year = req.params.year;
    console.log('Retrieving movie by year: ' + year);
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.filter(items, function(item) {
                return _.contains(item.year, year);
            });

            res.send(result);
        });
    });
};

exports.findMovieByGenre = function(req, res) {
    var genre = req.params.genre;
    console.log('Retrieving movie by genre: ' + genre);
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.filter(items, function(item) {
                return _.contains(item.genre, genre);
            });

            res.send(result);
        });
    });
};

exports.findMovieByDirector = function(req, res) {
    var director = req.params.director;
    console.log('Retrieving movie by director: ' + director);
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.filter(items, function(item) {
                return _.contains(item.director, director);
            });

            res.send(result);
        });
    });
};

exports.findMovieByDirectorAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var allDirectors = _.uniq(_.flatten(_.pluck(items, 'director'))),
                result = _.map(allDirectors, function(directorName) {
                var data = {
                    director: directorName,
                    movies: []
                };

                _.each(items, function(movie){
                    if (_.contains(movie.director, directorName)) {
                        data.movies.push(movie);
                    }
                });

                return data;
            });

            res.send(result);
        });
    });
};

exports.findDirectorAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.uniq(_.flatten(_.pluck(items, 'director')));

            res.send(result);
        });
    });
};

exports.findActorAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.uniq(_.flatten(_.pluck(items, 'actors')));

            res.send(result);
        });
    });
};

exports.findGenreAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.uniq(_.flatten(_.pluck(items, 'genres')));

            res.send(result);
        });
    });
};

exports.findCountryAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.uniq(_.flatten(_.pluck(items, 'countries')));

            res.send(result);
        });
    });
};
