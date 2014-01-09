var HeaderView = Backbone.View.extend({

    className: "ui grid center aligned",

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click .item:not(.disabled)': 'visitPage'
    },

    selectMenuItem: function(menuItem) {
        this.$('a').removeClass('active');
        this.$("a.item[data-page='"+menuItem+"']").addClass('active');
    },

    visitPage: function(event){
        var page = event.currentTarget.dataset.page;
        app.navigate(page, {trigger:true, replace:true});
    }

});