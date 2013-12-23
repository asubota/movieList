var Paginator = Backbone.View.extend({

    className: 'ui divided horizontal list',
    tagName:   'div',

    initialize: function(options) {
        this.options = options || {};
    },

    render: function() {
        var items = this.model.models,
            len = items.length,
            pageCount = Math.ceil(len / 16),
            items = '';

        for (var i=0; i < pageCount; i++) {
            items += this.template({pageId: i+1, current: this.options.page});
        }
        this.$el.append(items);

        return this;
    }

});
