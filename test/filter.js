'use strict';

var assert = require('assert');
var form   = require('./../index');

describe('Form', function() {
    describe('#filter', function () {
        it('should filter data', function () {
            var elements = {
                name: [
                    form.filter(form.Filter.trim)
                ]
            };

            form
                .create(elements)
                .process({name: ' tester ', active: '1'}, function(error, data) {
                    assert.equal(error, null);
                    assert.deepEqual(data, {name : 'tester'});
                });
        });
    });
});
