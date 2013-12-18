var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/movieList', function(err, db) {
    if(err) throw err;

    //*************
    // Movies
    //*************

    var moviesCollection = db.collection('movies'),
        movies = require( './assets/movies' );

    moviesCollection.remove(function(){
        console.log( ">>>>>> movies Cleared" );
        moviesCollection.insert( movies, function( err, docs ){
            console.log( ">>>>>> movies Insertion" );
            if( err ){
                console.log( err );
            }
            console.log( "movies inserted: " + docs.length );
            console.log( "Close, Ctrl+C" );
        });
    });
    //*************
    // Movies END
    //*************
});
