var MovieListView = Backbone.View.extend({

    initialize: function(options) {
        this.options = options || {};
        this.render();
    },

    className: "ui grid five column",

    events: {
        'click': 'detailInfo',
        'mouseenter .shape': 'cover',
        'mouseleave .shape': 'cover',
    },

    cover: function(event) {
        var shape = $(event.target).closest('.ui.shape');

        if (shape.hasClass('animating')) return;

        if (event.type === 'mouseenter') {
            shape.shape('set next side', '.text.side').shape('flip back');
        } else {
            shape.shape('set next side', '.cover.side').shape('flip over');
        }
    },

    detailInfo: function(event) {
        var id = $(event.target).closest('.ui.shape').data('id');

        if (id) {
            app.navigate("movies/" + id, {trigger: true});
        }
    },

    render: function() {
        var movies = this.model.models,
            len = movies.length,
            startPos, endPos;

        if (this.options.page) {
            startPos = (this.options.page - 1) * utils.per_page;
            endPos = Math.min(startPos + utils.per_page, len);
        } else {
            startPos = 0;
            endPos = len;
        }

        for (var i = startPos; i < endPos; i++) {
            this.$el.append(new MovieListItemView({model: movies[i]}).render().el);
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
