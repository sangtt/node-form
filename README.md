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

[travis-image]:    https://travis-ci.org/sangtt/node-form.svg?style=flat-square
[coveralls-image]: https://coveralls.io/repos/sangtt/node-form/badge.svg?branch=&service=github
[travis-url]:      https://travis-ci.org/sangtt/node-form
[coveralls-url]:   https://coveralls.io/github/sangtt/node-form?branch=
