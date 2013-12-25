var MovieView = Backbone.View.extend({

	initialize: function () {
		this.render();
	},

	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	className: 'ui grid',

	events: {
		'click .back': 'back',
		'click span.item': 'filter',
		'click .extra-info a': 'switchTab'
	},

	switchTab: function(event) {
		var tab = $(event.target).data('tab'),
			$extra = this.$el.find('.extra-info');

		$extra.find('.active')
			.removeClass('active')
			.end()
			.find('[data-tab="'+tab+'"]')
			.addClass('active');
	},

	back: function() {
		app.back();
	},

	filter: function(event) {
		event.preventDefault();
		// filter by ...
	}

});