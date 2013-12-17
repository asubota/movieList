var mongo = require('mongodb');
var _     = require('underscore');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('movieList', server, {safe:false});
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'movies' database");
        db.collection('movies', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'movies' collection doesn't exist. Create it with sample data... !");
            }
        });
    }
});
 
exports.findByYear = function(req, res) {
    var _year = req.params.year;
    
    console.log('Retrieving movie by year: ' + _year);
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            var result = _.map(_.where(items, {year: _year}), function(item) {
                return _.pick(item, 'id', 'title', 'year');
            });
            
            res.send(result);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving movie: ' + id);
    db.collection('movies', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};