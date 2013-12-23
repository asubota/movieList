var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "movies"            : "list",
        "movies/page/:page" : "list",
        "movies/:id"        : "movieDetails",
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1,
            movieList = new MovieCollection();
        
        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList, page: p}).el);
        }});
    },

    movieDetails: function(id) {
        var movie = new Movie({id: id});
        
        movie.fetch({success: function() {
            $("#content").html(new MovieView({model: movie}).el);
        }});
    },

    initialize: function() {
        this.routesHit = 0;
        Backbone.history.on('route', function() {
            this.routesHit++;
        }, this);
    },

    back: function() {
        if(this.routesHit > 1) {
            window.history.back();
        } else {
            this.navigate('movies', {trigger:true, replace:true});
        }
    }

});

utils.loadTemplate(['MovieView', 'MovieListItemView', 'Paginator'], function() {
    app = new AppRouter();
    Backbone.history.start();
});