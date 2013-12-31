var utils = {

    per_page: 18,

    format_text: function(text) {
        if (text.length >= 270) {
            text = text.substr(0,270) + "...";
        }

        return text;
    },

    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                console.log(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};