[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

# node-form

Form processor for filter and validation form data. This base on [form](https://github.com/baryshev/form).
I develop this module because the idea of this package is very good, but the current module didn't work.

## Installation

Install [node-form](https://travis-ci.org/sangtt/node-form) then run the following.

```shell
$ npm install node-form --save-dev
```

## Example

Processing an example form:

```javascript
var form = require('node-form');

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
```

The result:

```javascript
error: null
data: { name: 'tester' }
```

## Extend your validator

You can define your own validator:

```javascript
var form = require('node-form');

form.extend('isNotEmpty', function(str) {
    return (str.length > 0) ? true : false;
});

var elements = {
    name: [
        form.filter(form.Filter.toString),
        form.filter(form.Filter.trim),
        form.validator(form.Validator.isNotEmpty, 'Bad Name'),
    ],
    email: [
        form.filter(form.Filter.toString),
        form.filter(form.Filter.trim),
        form.validator(form.Validator.isNotEmpty, 'Bad Email'),
    ]
};

form
    .create(elements)
    .process({
        active : '1',
        name   : ' tester ',
        email  : '  '
    }, function(error, data) {
        console.log('error:', error);
        console.log('data:', data);
    });
```

The result:

```javascript
error: { email: [ 'Bad Email' ] }
data: { name: 'tester', email: '' }
```

## Your own validator

You can use your own validator:

```javascript
var form = require('node-form');

function customNameValidator(data, name, callback) {
    setTimeout(function(){
        callback('So bad', data);
    }, 500);
}

var elements = {
    name: [
        form.filter(form.Filter.toString),
        form.filter(form.Filter.trim),
        customNameValidator
    ]
};

form
    .create(elements)
    .process({
        active : '1',
        name   : ' tester '
    }, function(error, data) {
        console.log('error:', error);
        console.log('data:', data);
    });
```

The result:

```javascript
error: { name: [ 'So bad' ] }
data: { name: 'tester' }
```




[travis-image]:    https://travis-ci.org/sangtt/node-form.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/sangtt/node-form/master.svg?style=flat-square
[travis-url]:      https://travis-ci.org/sangtt/node-form
[coveralls-url]:   https://coveralls.io/github/sangtt/node-form?branch=master
