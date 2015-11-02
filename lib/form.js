'use strict';
var validator = require('validator');

function Form(elements) {
    this.elements = elements;
}

Form.prototype.process   = function(request, callback) {
    var
        data = {},
        name;
    for (name in this.elements) {
        if (this.elements.hasOwnProperty(name)) {
            data[name] = (name in request) ? request[name] : null;
            this.elements[name].forEach(function(handler) {
                handler.apply(null, [data, name, function(error, result) {
                    data = result;
                }]);
            });
        }
    }
    callback(null, data);
};

module.exports.Filter = validator;

module.exports.create = function(fields) {
    return new Form(fields);
};

module.exports.filter = function(filter) {
    return function(data, name, callback) {
        data[name] = filter.apply(null, [data[name]]);
        callback(null, data);
    };
};
