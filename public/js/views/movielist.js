var MovieListView = Backbone.View.extend({

    initialize: function(options) {
        this.options = options || {};
        this.render();
    },

    className: "ui six column grid center aligned",

    events: {
        'click .ui.segment': 'detailInfo'
    },

    detailInfo: function(event) {
        var id = $(event.target).closest('.ui.segment').data('id');
        app.navigate("movies/" + id, {trigger: true});
    },

    render: function() {
        var movies = this.model.models,
            len = movies.length,
            startPos, endPos,
            paginator = true;

        if (this.options.page) {
            startPos = (this.options.page - 1) * utils.per_page;
            endPos = Math.min(startPos + utils.per_page, len);
        } else {
            paginator = false;
            startPos = 0;
            endPos = len;
        }

        for (var i = startPos; i < endPos; i++) {
            this.$el.append(new MovieListItemView({model: movies[i]}).render().el);
        }

        if (paginator) {
            this.$el.append('<div class="ui horizontal icon divider"><i class="circular asterisk icon"></i></div>');
            this.$el.append(new PaginatorView({model: this.model, page: this.options.page}).render().el);
        }

        return this;
    }
});

var MovieListItemView = Backbone.View.extend({

    className: "column",
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});