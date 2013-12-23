var MovieView = Backbone.View.extend({

	initialize: function () {
		this.render();
	},

	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	events: {
		'click .back': 'back'
	},

	back: function() {
		app.back();
	}

});