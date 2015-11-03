'use strict';
var async     = require('async');
var validater = require('validator');

function Form(elements) {
    this.data     = {};
    this.errors   = null;
    this.elements = elements;
}

Form.prototype.createTask = function(name, handler) {
    var self = this;
    return function(callback) {
        handler.apply(null, [self.data, name, function(error, result) {
            if (error !== null) {
                if (self.errors === null) {
                    self.errors = {};
                }
                if (name in self.errors) {
                    self.errors[name].push(error);
                } else {
                    self.errors[name] = [error];
                }
            } else {
                self.data = result;
            }
            callback(null, self.data);
        }]);
    };
};

Form.prototype.process = function(request, callback) {
    var
        self  = this,
        tasks = [],
        name;
    for (name in this.elements) {
        if (this.elements.hasOwnProperty(name)) {
            self.data[name] = (name in request) ? request[name] : null;
            this.elements[name].forEach(function(handler) {
                var task = self.createTask(name, handler);
                tasks.push(task);
            });
        }
    }

    if (tasks.length > 0) {
        async.series(tasks, function(/* error, result */) {
            callback(self.errors, self.data);
        });
    }
};

module.exports.Filter    = validater;
module.exports.Validator = validater;

module.exports.create = function(fields) {
    return new Form(fields);
};

module.exports.filter = function(filter) {
    return function(data, name, callback) {
        data[name] = filter.apply(null, [data[name]]);
        callback(null, data);
    };
};

module.exports.validator = function(validator) {
    var args    = Array.prototype.slice.call(arguments, 1, arguments.length - 1),
        message = arguments[arguments.length - 1];
    return function(data, name, callback) {
        var isValid = validator.apply(null, [data[name]]);
        if (isValid) {
            callback(null, data);
        } else {
            callback(message, data);
        }
    };
};

module.exports.extend = function(name, callback) {
    validater.extend(name, callback);
};

