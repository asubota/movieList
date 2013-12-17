
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/movieList', function(err, db) {
    if(err) throw err;

    //*************
    // Movies
    //*************
    var moviesCollection = db.collection('movies');
    
    var movies1 = require( './assets/1_movies' );
    var movies2 = require( './assets/2_movies' );
    var movies = [].concat(movies1).concat(movies2);

    moviesCollection.remove(function(){
        console.log( ">>>>>> movies Cleared" );
        moviesCollection.insert( movies, function( err, docs ){
            console.log( ">>>>>> movies Insertion" );
            if( err ){
                console.log( err );
            }
            console.log( "movies inserted: " + docs.length );
        });
    });
    //*************
    // Movies END
    //*************

});
