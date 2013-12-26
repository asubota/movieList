var Movie = Backbone.Model.extend({
	urlRoot: "/movie",
	idAttribute: "id",
});

var MovieCollection = Backbone.Collection.extend({
	model: Movie,
	url: "/movie",

	initialize: function(options){
		if (options) {
			this.url = this.url + "/" + options.type + "/" + options.value;
		}
	}
});