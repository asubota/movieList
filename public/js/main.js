var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "movies"            : "list",
        "year/:value"       : "byyear",
        "movies/page/:page" : "list",
        "movies/:id"        : "movieDetails",
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1,
            movieList = new MovieCollection();

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList, page: p}).el);
        }});
        this.headerView.selectMenuItem('main');
    },

    byyear: function(year) {
        var
            movieList = new MovieCollection({type: 'year', value: year});

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList}).el);
        }});
        this.headerView.selectMenuItem('year');
    },

    movieDetails: function(id) {
        var movie = new Movie({id: id});
        
        movie.fetch({success: function() {
            $("#content").html(new MovieView({model: movie}).el);
        }});
        this.headerView.selectMenuItem('details');
    },

    initialize: function() {
        this.headerView = new HeaderView();
        $('#header').html(this.headerView.el);
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

utils.loadTemplate(['MovieView', 'MovieListItemView', 'PaginatorView', 'HeaderView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});