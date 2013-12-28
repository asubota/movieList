var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "movies"            : "list",
        "year/:value"       : "byyear",
        "genre/:value"      : "bygenre",
        "director/:value"   : "bydirector",
        "country/:value"    : "bycountry",

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

    byyear: function(value) {
        var movieList = new MovieCollection({type: 'year', value: value});

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList}).el);
        }});
        this.headerView.selectMenuItem('year');
    },

    bygenre: function(value) {
        var movieList = new MovieCollection({type: 'genre', value: value});

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList}).el);
        }});
        this.headerView.selectMenuItem('genre');
    },

    bydirector: function(value) {
        var movieList = new MovieCollection({type: 'director', value: value});

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList}).el);
        }});
        this.headerView.selectMenuItem('director');
    },

    bycountry: function(value) {
        var movieList = new MovieCollection({type: 'country', value: value});

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList}).el);
        }});
        this.headerView.selectMenuItem('country');
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
        this.routesHit = 0;

        $('#header').html(this.headerView.el);

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