var mongo = require('mongodb'),
    _     = require('underscore'),
    $     = require('jquery');

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
            var result = items;

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
    sendListBy(req, res, 'year');
};

exports.findMovieByGenre = function(req, res) {
    sendListBy(req, res, 'genres');
};

exports.findMovieByDirector = function(req, res) {
    sendListBy(req, res, 'directors');
};

exports.findMovieByCountry = function(req, res) {
    sendListBy(req, res, 'countries');
};

exports.findDirectorAll = function(req, res) {
    sendListOf(req, res, 'directors');
};

exports.findActorAll = function(req, res) {
    sendListOf(req, res, 'actors');
};

exports.findGenreAll = function(req, res) {
    sendListOf(req, res, 'genres');
};

exports.findYearAll = function(req, res) {
    sendListOf(req, res, 'year');
};

exports.findCountryAll = function(req, res) {
    sendListOf(req, res, 'countries');
};

function sendListBy(req, res, type) {
    $.when(__getListBy_(req, res, type)).done(function(response) {
        res.send(response);
    });
}

function __getListBy_(req, res, type) {
    var value = req.params.value,
        deferred = new $.Deferred();

    console.log('Retrieving movie by ' + type + ' : ' + value);

    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.filter(items, function(item) {
                return _.isArray(item[type]) ? _.contains(item[type], value) : item[type] === value;
            });

            deferred.resolve(result);
        });
    });

    return deferred.promise();
}

function sendListOf(req, res, type) {
    $.when(__getListOf_(req, res, type)).done(function(response) {
        res.send(response);
    });
}

function __getListOf_(req, res, type) {
    var deferred = new $.Deferred();

    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.uniq(_.flatten(_.pluck(items, type)));

            deferred.resolve(result);
        });
    });

    return deferred.promise();
}
