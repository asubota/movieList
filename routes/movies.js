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

exports.findByYear = function(req, res) {
    var year = req.params.year;
    console.log('Retrieving movie by year: ' + year);
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.map(_.filter(items, function(item) {
                return _.contains(item.year, year);
            }), function(item) {
                return _.pick(item, ['title_ru', 'year', 'id']);
            });

            res.send(result);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.sample(items, 24);

            res.send(result);
        });
    });
};