'use strict';

var Optionall = require('../lib/optionall.js')
  , Path = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['optionall'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'standard options': function(test) {
    var options = new Optionall({__dirname: Path.resolve('./')});

    test.ok(options.name === 'optionall');

    test.ok(options.aws.accessKeyId === 'fake');
    test.ok(options.user === process.env.USER);

    test.done();
  },
  'explicit directory': function(test) {
    var options = new Optionall(Path.join(process.cwd(), 'node_modules/jsbelt'));

    test.ok(options.name === 'jsbelt');
    test.ok(!options.aws);
    test.ok(options.user === process.env.USER);

    test.done();
  },
  'production options': function(test) {
    var options = new Optionall({'env': 'production', '__dirname': Path.resolve('./')});

    test.ok(options.environment === 'production');
    test.ok(options.env === 'production');
    test.ok(options.NODE_ENV === 'production');

    test.ok(options.name === 'optionall');
    test.ok(options.aws.accessKeyId === 'production_fake');
    test.ok(options.user === process.env.USER);

    test.done();
  },
  'environment': function(test) {
    var options = new Optionall({'env': 'production', '__dirname': Path.resolve('./')});

    test.ok(options.environment === 'production');
    test.ok(options.env === 'production');
    test.ok(options.NODE_ENV === 'production');

    test.ok(options.name === 'optionall');
    test.ok(options.aws.accessKeyId === 'production_fake');
    test.ok(options.user === process.env.USER);

    options = new Optionall({'environment': 'balloon'});

    test.ok(options.environment === 'balloon');
    test.ok(options.env === 'balloon');
    test.ok(options.NODE_ENV === 'balloon');

    process.env.NODE_ENV = 'something';
    process.env.ENV = 'something';

    options = new Optionall();

    test.ok(options.environment === 'something');
    test.ok(options.env === 'something');
    test.ok(options.NODE_ENV === 'something');

    test.done();
  }
};
