var form = require('./../index');

var elements = {
    name: [
        form.filter(form.Filter.trim)
    ]
};

form
    .create(elements)
    .process({'name': ' tester ', 'active': '1'}, function(error, data) {
        console.log('error:', error);
        console.log('data:', data);
    });
