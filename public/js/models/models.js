var Movie = Backbone.Model.extend({
    urlRoot: "/movies",
    idAttribute: "id",
});

var MovieCollection = Backbone.Collection.extend({
    model: Movie,
    url: "/movies"
});