var Paginator = Backbone.View.extend({

    className: 'ui divided horizontal list',

    initialize: function(options) {
        this.options = options || {};
    },

    events: {
        'click .ui.button': 'visitPage'
    },

    visitPage: function(event) {
        var page_id = $(event.target).data('page_id');
        app.navigate("movies/page/" + page_id, {trigger: true});
    },

    render: function() {
        var items = this.model.models,
            len = items.length,
            pageCount = Math.ceil(len / utils.per_page);

        for (var i=0; i < pageCount; i++) {
            this.$el.append(this.template({pageId: i+1, current: this.options.page}));
        }

        return this;
    }

});