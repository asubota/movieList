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
		'click .extra-info a': 'switchTab',
		'click .sort-by': 'sortBy'
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

	sortBy: function(event) {
		var $element = $(event.target);
		app.navigate($element.data('sort') + "/" + $element.data('value'), {trigger: true});
	},

});