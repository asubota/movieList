var utils = {

    per_page: 20,

    format_text: function(text) {
        if (text.length >= 200) {
            text = text.substr(0,200) + "...";
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