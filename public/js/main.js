var AppRouter = Backbone.Router.extend({

    routes: {
        ''                      : 'list',
        'movies'                : 'list',
        'movies/page/:page'     : 'list',

        'year'          : 'getList',
        'genre'         : 'getList',
        'director'      : 'getList',
        'country'       : 'getList',

        ':id'                   : 'movieDetails',
        'filter/:type/:value'   : 'filter'
    },

    getList: function() {
        var currentUrl = Backbone.history.fragment,
            itemList = new ItemCollection({type: currentUrl});

        itemList.fetch({success: function() {
            $("#content").html( new ItemListView({model: itemList, name: currentUrl}).el );
        }});

        this.headerView.selectMenuItem(currentUrl);
    },

    filter: function(type, value) {
        var movieList = new MovieCollection({type: type, value: value});

        movieList.fetch({success: function() {
            $("#content").html(new MovieListView({model: movieList}).el);
        }});
        this.headerView.selectMenuItem(value);
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1,
            movieList = new MovieCollection();

        movieList.fetch({success: function() {
            $("#content")
                .html(new MovieListView({model: movieList, page: p}).el)
                .append('<div class="ui horizontal icon divider"><i class="circular asterisk icon"></i></div>')
                .append(new PaginatorView({model: movieList, page: p}).render().el);
        }});
        this.headerView.selectMenuItem('movies');
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

utils.loadTemplate(['MovieView', 'MovieListItemView', 'PaginatorView', 'HeaderView', 'ItemListView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
