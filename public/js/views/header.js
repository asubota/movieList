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
        'click .item.item-main': 'mainPage'
    },

    selectMenuItem: function(menuItem) {
        this.$('a').removeClass('active');
        this.$('a.item'+'.item-'+menuItem).addClass('active');
    },
    
    mainPage: function(){
        app.navigate('movies', {trigger:true, replace:true});
    }

});