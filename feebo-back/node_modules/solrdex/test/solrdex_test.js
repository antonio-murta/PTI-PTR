'use strict';

var Optionall = require('optionall')
  , Path = require('path')
  , O = new Optionall({
                       '__dirname': Path.resolve(module.filename + '/../..')
                     , 'file_priority': ['package.json', 'environment.json', 'config.json']
                     })
  , Async = require('async')
  , Belt = require('jsbelt')
  , _ = require('underscore')
  , Solrdex = new require('../lib/solrdex.js')(O)
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

exports['tests'] = {
  setUp: function(done) {
    done();
  },
  'solr': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        return Solrdex.delete('*', Belt.cw(cb, 0));
      }
    , function(cb){
        globals.uuid = Belt.uuid();
        return Solrdex.add({'id': globals.uuid, 'body_en': 'this is body text'}, Belt.cw(cb, 0));
      }
    , function(cb){
        return Solrdex.getById(globals.uuid, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(globals.docs.length === 1);
        test.ok(globals.docs[0].id === globals.uuid);
        test.ok(globals.docs[0].body_en[0] === 'this is body text');

        globals.docs = undefined;

        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('body text', {'qf': ['body_en']}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(_.find(globals.docs, function(d){ return d.id === globals.uuid; }));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('body text', {'qf': {'body_en': '30', 'id': '10'}}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(_.find(globals.docs, function(d){ return d.id === globals.uuid; }));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('body text', {'qf': {'body_en': null, 'id': '10'}}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(_.find(globals.docs, function(d){ return d.id === globals.uuid; }));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('texxt monkey buddy', {'qf': {'body_en': '30', 'id': '10'}}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(_.find(globals.docs, function(d){ return d.id === globals.uuid; }));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('texts bodies', {'qf': {'body_en': '30', 'id': '10'}}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(_.find(globals.docs, function(d){ return d.id === globals.uuid; }));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('monkey', {'qf': {'body_en': '30', 'id': '10'}}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(!_.any(globals.docs));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.delete(globals.uuid, Belt.cw(cb, 0));
      }
    , function(cb){
        return Solrdex.getById(globals.uuid, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(globals.docs.length === 0);

        return cb();
      }
    , function(cb){
        return Solrdex.delete('*', Belt.cw(cb, 0));
      }
    , function(cb){
        globals.uuids = Belt.sequence(Belt.uuid, 20);
        globals.uuids_b = Belt.sequence(Belt.uuid, 20);
        globals.adddocs = _.map(globals.uuids, function(u){ 
          return {'id': u, 'body_en': 'to be or not to be that is the question', 'models_s': 'apples'};
        });
        globals.adddocs = globals.adddocs.concat(_.map(globals.uuids_b, function(u){ 
          return {'id': u, 'body_en': 'to be or not to be that is the question', 'models_s': 'oranges'};
        }));

        return Solrdex.add(globals.adddocs, Belt.cw(cb, 0));
      }
    , function(cb){
        return Solrdex.getByIds(globals.uuids, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        return Solrdex.getByIds(globals.uuids_b, Belt.cs(cb, globals, 'docs_b', 1, 0));
      }
    , function(cb){
        test.ok(globals.docs.length === 20);
        test.ok(globals.docs_b.length === 20);

        globals.docs = undefined;

        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('question to be', {'qf': ['body_en']}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(globals.docs.length === 40);

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.textSearch('question to be', {'qf': ['body_en'], 'fq': 'models_s:apples'}, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        test.ok(globals.docs.length === 20);
        test.ok(!_.find(globals.docs, function(d){ return d.models_s !== 'apples'; }));

        globals.docs = undefined;
        return cb();
      }
    , function(cb){
        return Solrdex.delete(globals.uuids.concat(globals.uuids_b), Belt.cw(cb, 0));
      }
    , function(cb){
        return Solrdex.getByIds(globals.uuids, Belt.cs(cb, globals, 'docs', 1, 0));
      }
    , function(cb){
        return Solrdex.getByIds(globals.uuids_b, Belt.cs(cb, globals, 'docs_b', 1, 0));
      }
    , function(cb){
        test.ok(globals.docs.length === 0);
        test.ok(globals.docs_b.length === 0);
        return cb();
      }
    , function(cb){
        globals.uuids = Belt.sequence(Belt.uuid, 300);
        globals.written = [];
        var i = 0;
        return Async.eachLimit(20, globals.uuids, function(u, _cb){
          var uuid = _.sample(globals.uuids);
          if (uuid) Solrdex.getById(uuid, function(err, doc){
            test.ok(!err);
            return test.ok(doc.id === uuid);
          });

          console.log(i++);

          return Solrdex.add({'id': u, 'body_en': 'inserting a bunch of documents'}, Belt.cw(_cb, 0));
        }, Belt.cw(cb, 0));
      }
    , function(cb){
        return Solrdex.delete('*', Belt.cw(cb, 0));
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);
      return test.done();
    });
  },
};
