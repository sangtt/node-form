var form = require('./../index');

form.extend('isNotEmpty', function(str) {
    return (str.length > 0) ? true : false;
});

function customNameValidator(data, name, callback) {
    setTimeout(function(){
        callback('So bad', data);
    }, 500);
}

var elements = {
    name: [
        form.filter(form.Filter.toString),
        form.filter(form.Filter.trim),
        form.validator(form.Validator.isNotEmpty, 'Bad Name'),
        customNameValidator
    ],
    email: [
        form.filter(form.Filter.toString),
        form.filter(form.Filter.trim),
        form.validator(form.Validator.isEmail, 'Bad email')
    ]
};

form
    .create(elements)
    .process({
        active : '1',
        email  : 'tester@tester.com',
        name   : ' tester ',
    }, function(error, data) {
        console.log('error:', error);
        console.log('data:', data);
    });
