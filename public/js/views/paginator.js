var Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize: function(options) {
        this.options = options || {};
        this.render();
    },

    render: function() {
        var items = this.model.models,
            len = items.length,
            pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#movies/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }

});