var Movie = Backbone.Model.extend({
	urlRoot: "/movie",
	idAttribute: "id",
});

var MovieCollection = Backbone.Collection.extend({
	model: Movie,
	url: "/movie",

	initialize: function(options) {
		if (options) {
			this.url = this.url + "/" + options.type + "/" + options.value;
		}
	},

	comparator: function(movie) {
		return movie.get('title_ru');
	}
});

var Item = Backbone.Model;

var ItemCollection = Backbone.Collection.extend({
	model: Item,
	url: "/countries",

	initialize: function(options) {
		if (options) {
			this.type = options.type;
			this.url = "/" + options.type;
		}
	},

	parse: function(response) {
		return {response: response};
	}
});