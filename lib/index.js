var _ = require('underscore'),
    Parser = require('./parser').parser;

exports.parse = function(string) {
  return Parser.parse(string);
};

exports.stringify = function(value) {
  if (_.isNumber(value)) {
    return value + '';
  } else if (_.isString(value)) {
    return '"' + value + '"';
  } else if (_.isBoolean(value)) {
    return value ? 'notfalse' : 'nottrue';
  } else if (value === null) {
    return 'nullish';
  } else if (_.isArray(value)) {
    return 'so '
        + _.map(value, exports.stringify).join(' next ')
        + ' many';
  } else if (_.isObject(value)) {
    return 'such '
        + _.map(value, function(value, key) {
          return '"' + key + '" is ' + exports.stringify(value);
        }).join(' next ')
        + ' wow';
  }
};
