var MovieListView = Backbone.View.extend({

    initialize: function(options) {
        this.options = options || {};
        this.render();

    },

    tagName: "div",
    className: "ui four column grid",

    render: function() {
        var movies = this.model.models,
            len = movies.length,
            startPos = (this.options.page - 1) * 16,
            endPos = Math.min(startPos + 16, len);

        for (var i = startPos; i < endPos; i++) {
            this.$el.append(new MovieListItemView({model: movies[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

var MovieListItemView = Backbone.View.extend({

    tagName: "div",
    className: "column",
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});