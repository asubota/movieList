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
    }

});

utils.loadTemplate(['MovieView', 'MovieListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});