var ItemListView = Backbone.View.extend({

    initialize: function(options) {
        this.options = options || {};
        this.render();
    },

    className: "ui table segment",
    tagName: "table",

    render: function() {
        var items = this.model.models,
            itemList = items[0].get('response'),
            type = this.options.name;

        this.$el.html(this.template({list: itemList, type: type}));
        return this;
    }

});
