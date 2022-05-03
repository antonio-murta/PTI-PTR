'use strict';

var Rol = require('../lib/rol.js')
  , Belt = require('jsbelt')
  , Async = require('async')
  , _ = require('underscore')
  , Globals = {}
;

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

exports['Rol'] = {
  setUp: function(done) {
    done();
  },
  'tests': function(test) {
    Globals.obj = {};
    Globals.rol = new Rol();
    Globals.rol.wrap(Globals.obj);

    //wrapping
    test.ok(typeof Globals.obj.rol === 'function');
    test.ok(typeof Globals.obj.rolSync === 'function');
    test.ok(typeof Globals.obj.rolAsync === 'function');
    test.ok(typeof Globals.obj.addRule === 'function');
    test.ok(typeof Globals.obj.removeRule === 'function');
    test.ok(_.isArray(Globals.obj._rol.rules));

    test.ok(!_.any(Globals.obj._rol.rules));

    Globals.obj.hello = function(name){
      return 'Hello, ' + name;
    };
    Globals.obj.asyncHello = function(name, cb){
      return cb('Hello, ' + name);
    };
    Globals.obj.name = 'Pablo';

    //pass-through
    test.ok(Globals.obj.rol(null, 'hello', ['Frank']) === 'Hello, Frank');
    test.ok(Globals.obj.rol({'name': 'Bill'}, 'hello', ['Frank']) === 'Hello, Frank');

    test.ok(Globals.obj.rol(null, 'name') === 'Pablo');
    test.ok(Globals.obj.rol({'name': 'Bill'}, 'name') === 'Pablo');

    Globals.obj.rol(null, 'asyncHello', ['Pablo', function(msg){
      return test.ok(msg === 'Hello, Pablo');
    }]);

    var rule1 = {'label': 'first'
                , 'handler': function(name, args){ return; }
                }
      , rule2 = {'label': 'second'
                , 'handler': function(name, args){ return; }
                }
      , rule3 = {'label': 'third'
                , 'handler': function(name, args){ return; }
                }
      , rule4 = function(name, args){ return; };

    Globals.obj.addRule(rule1);

    test.ok(Globals.obj._rol.rules.length === 1);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule1));

    Globals.obj.addRule(rule2);

    test.ok(Globals.obj._rol.rules.length === 2);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule1));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule2));

    Globals.obj.addRule(rule3, 0);

    test.ok(Globals.obj._rol.rules.length === 3);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule1));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[2], rule2));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule3));

    Globals.obj.addRule(rule3, 1);

    test.ok(Globals.obj._rol.rules.length === 4);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[2], rule1));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[3], rule2));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule3));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule3));

    Globals.obj.removeRule(1);

    test.ok(Globals.obj._rol.rules.length === 3);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule1));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[2], rule2));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule3));

    Globals.obj.removeRule(0);

    test.ok(Globals.obj._rol.rules.length === 2);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule1));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule2));

    Globals.obj.removeRule(1);

    test.ok(Globals.obj._rol.rules.length === 1);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule1));

    Globals.obj.removeRule(0);
    test.ok(Globals.obj._rol.rules.length === 0);

    Globals.obj.addRule(rule1);
    Globals.obj.addRule(rule2);
    Globals.obj.addRule(rule3);

    Globals.obj.removeRule('first');
    test.ok(Globals.obj._rol.rules.length === 2);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule2));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule3));

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    test.ok(Globals.obj._rol.rules.length === 0);

    Globals.obj.addRule(rule1);
    Globals.obj.addRule(rule2);
    Globals.obj.addRule(rule3);

    Globals.obj.removeRule(/first|second/);

    test.ok(Globals.obj._rol.rules.length === 1);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule3));

    Globals.obj.removeRule(/first|second|th/);
    test.ok(Globals.obj._rol.rules.length === 0);

    Globals.obj.addRule(rule1);
    Globals.obj.addRule(rule2);
    Globals.obj.addRule(rule3);
    Globals.obj.addRule(rule4);

    test.ok(Globals.obj._rol.rules.length === 4);

    Globals.obj.removeRule(/first|second|th/);
    test.ok(Globals.obj._rol.rules.length === 1);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule4));

    Globals.obj.removeRule(0);

    test.ok(Globals.obj._rol.rules.length === 0);

    Globals.obj.addRule(rule1);
    Globals.obj.addRule(rule2);
    Globals.obj.addRule(rule3);
    Globals.obj.addRule(rule4);

    Globals.obj.removeRule(3);
    test.ok(Globals.obj._rol.rules.length === 3);
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[0], rule1));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[1], rule2));
    test.ok(Belt.deepEqual(Globals.obj._rol.rules[2], rule3));

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    test.ok(Globals.obj._rol.rules.length === 0);

    Globals.acObj = {'name': 'Bill'};

    Globals.obj.addRule(function(acObj, methObj){
      test.ok(Belt.deepEqual(acObj, Globals.acObj));
      test.ok(methObj.method === 'hello');
      test.ok(Belt.deepEqual(methObj.args, ['Frank']));
      return;
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Hello, Frank');

    Globals.obj.addRule(function(acObj, methObj){
      test.ok(Belt.deepEqual(acObj, Globals.acObj));
      test.ok(methObj.method === 'hello');
      test.ok(Belt.deepEqual(methObj.args, ['Frank']));
      return 'cyborg';
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'cyborg');

    Globals.obj.addRule(function(acObj, methObj){
      return 'not a cyborg';
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'cyborg');

    Globals.obj.addRule(function(acObj, methObj){
      return 'not a cyborg';
    }, 0);

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'not a cyborg');

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'selector': /hello/
    , 'handler': function(acObj, methObj){
        test.ok(Belt.deepEqual(acObj, Globals.acObj));
        test.ok(methObj.method === 'hello');
        test.ok(Belt.deepEqual(methObj.args, ['Frank']));
        return 'cyborg';
      }
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'cyborg');
    test.ok(Globals.obj.rol(Globals.acObj, 'name') === 'Pablo');

    Globals.obj.addRule({
      'selector': 'name'
    , 'handler': function(acObj, methObj){
        test.ok(Belt.deepEqual(acObj, Globals.acObj));
        test.ok(methObj.method === 'name');
        return 'not a cyborg';
      }
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'cyborg');
    test.ok(Globals.obj.rol(Globals.acObj, 'name') === 'not a cyborg');

    Globals.obj.addRule({
      'selector': /hello|name/
    , 'handler': function(acObj, methObj){
        return 'monkey';
      }
    }, 0);

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'monkey');
    test.ok(Globals.obj.rol(Globals.acObj, 'name') === 'monkey');

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'selector': 'hello'
    , 'handler': function(acObj, methObj){
        methObj.method = 'name';
        return;
      }
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Pablo');

    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'selector': 'hello'
    , 'handler': function(acObj, methObj){
        methObj.args = [acObj.name];
        return;
      }
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Hello, Bill');

    Globals.obj.addRule({
      'selector': 'hello'
    , 'handler': function(acObj, methObj){
        methObj.args[0] += ' Cyborg';
        return;
      }
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Hello, Bill Cyborg');

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'handler': function(acObj, methObj){
        methObj.args = [acObj.name];
        return;
      }
    });

    Globals.obj.addRule({
      'selector': 'hello'
    , 'handler': function(acObj, methObj){
        methObj.args[0] += 'Cyborg';
        return;
      }
    }, 0);

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Hello, Bill');

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'handler': function(acObj, methObj){
        methObj.args[0] += acObj.name;
        return;
      }
    });

    Globals.obj.addRule({
      'selector': 'hello'
    , 'handler': function(acObj, methObj){
        methObj.args[0] = 'Cyborg ';
        return;
      }
    }, 0);

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Hello, Cyborg Bill');

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'handler': function(acObj, methObj){
        methObj.args[0] = this.name;
        return;
      }
    });

    test.ok(Globals.obj.rol(Globals.acObj, 'hello', ['Frank']) === 'Hello, Pablo');

    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'selector': /async/
    , 'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'first';
        return cb();
      }
    });

    Globals.obj.addRule({
      'selector': 'asyncHello'
    , 'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'second';
        return cb();
      }
    });

    Globals.obj.addRule({
      'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'third';
        return cb();
      }
    });

    Globals.obj.rol(Globals.acObj, 'asyncHello', ['Frank', function(name){
      return test.ok(name === 'Hello, third');
    }]);

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'selector': /async/
    , 'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'first';
        return cb('stopped it');
      }
    });

    Globals.obj.addRule({
      'selector': 'asyncHello'
    , 'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'second';
        return cb();
      }
    });

    Globals.obj.addRule({
      'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'third';
        return cb();
      }
    });

    Globals.obj.rol(Globals.acObj, 'asyncHello', ['Frank', function(name){
      return test.ok(name === 'stopped it');
    }]);

    Globals.obj.removeRule(0);
    Globals.obj.removeRule(0);

    Globals.obj.addRule({
      'selector': /async/
    , 'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'first';
        return cb();
      }
    });

    Globals.obj.addRule({
      'selector': 'asyncHello'
    , 'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'second';
        return cb('stopped', 'here');
      }
    });

    Globals.obj.addRule({
      'handler': function(acObj, methObj, cb){
        test.ok(this.name === 'Pablo');

        methObj.args[0] = 'third';
        return cb();
      }
    });

    Globals.obj.rol(Globals.acObj, 'asyncHello', ['Frank', function(name, name2){
      test.ok(name === 'stopped');
      return test.ok(name2 === 'here');
    }]);

    Globals.iObj = {};
    Globals.obj.interface(Globals.iObj, Globals.obj);

    Globals.iObj.asyncHello('Frank', function(name, name2){
      test.ok(name === 'stopped');
      return test.ok(name2 === 'here');
    });

    Globals.iObj = {};
    Globals.obj.interface(Globals.iObj, Globals.obj, {'keys': ['hello']});
    test.ok(Globals.iObj.hello);
    test.ok(!Globals.iObj.asyncHello);

    test.done();
  }
};
