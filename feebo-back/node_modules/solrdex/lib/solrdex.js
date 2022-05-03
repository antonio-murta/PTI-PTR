/*
 * solrdex
 * https://github.com/sackio/solrdex
 *
 * Copyright (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

'use strict';

var Request = require('request')
  , _ = require('underscore')
  , Belt = require('jsbelt')
  , Async = require('async')
;

module.exports = function(O){
  var M = {};
  M.settings = Belt.extend({
    'host': '127.0.0.1'
  , 'port': '8080'
  , 'core': ''
  , 'path': '/solr'
  , 'protocol': 'http'
  , 'pool': 20
  , 'commitWithin': 1500
  , 'commit': false
  }, _.omit(O || {}, 'path'), Belt.get(O, 'solr') || {});

  /*
    Throttle requests to Solr through this queue
  */
  M._client = Async.queue(function(task, cb){
    return Request(task.request, function(){
      task.callback.apply(this, arguments);
      return cb();
    });
  }, M.settings.pool);

  /*
    Add / update documents
  */
  M['add'] = function(docs, options, callback){
    var a = Belt.argulint(_.values(arguments).slice(1))
      , self = this;
    a.o = _.defaults(a.o, {
      'commitWithin': M.settings.commitWithin
    , 'commit': M.settings.commit
    });

    var d = Belt.toArray(docs)
      , qs = {'wt': 'json'};

    if (a.o.commit){
      qs.commit = a.o.commit;
    } else {
      qs.commitWithin = a.o.commitWithin;
    }

    return M._client.push({'request': {
                             'method': 'POST'
                           , 'json': d
                           , 'url': M.settings.protocol + '://' + M.settings.host + ':' + M.settings.port + M.settings.path + '/update/json'
                           , 'qs': qs
                           }
                         , 'callback': function(err, response, body){
                             var status = Belt._get(body, 'responseHeader.status');
                             if (status !== 0 && !err) err = new Error('Documents could not be added to Solr');
                             return a.cb(err, body);
                           }
                          });
  };

  M['update'] = M.add; //alias of add

  /*
    Remove documents with ids (accepts single id or array)
  */
  M['delete'] = function(ids, options, callback){
    var a = Belt.argulint(_.values(arguments).slice(1))
      , self = this;
    a.o = _.defaults(a.o, {
      'commitWithin': M.settings.commitWithin
    , 'commit': M.settings.commit
    });

    var i = Belt.toArray(ids)
      , qs = {'wt': 'json'};

    if (a.o.commit){
      qs.commit = a.o.commit;
    } else {
      qs.commitWithin = a.o.commitWithin;
    }

    return M._client.push({'request': {
                             'method': 'POST'
                           , 'json': {'delete': {'query': _.map(i, function(d){ return 'id:' + d; }).join(' OR ') }}
                           , 'url': M.settings.protocol + '://' + M.settings.host + ':' + M.settings.port + M.settings.path + '/update/json'
                           , 'qs': qs
                           }
                         , 'callback': function(err, response, body){
                             var status = Belt._get(body, 'responseHeader.status');
                             if (status !== 0 && !err) err = new Error('Documents could not be deleted from Solr');
                             if (err) console.error(JSON.stringify(body, null, 2));
                             return a.cb(err, body);
                           }
                          });
  };

  /*
    Retrieve documents by ids (accepts array or single id)
  */
  M['getByIds'] = function(ids, options, callback){
    var a = Belt.argulint(_.values(arguments).slice(1))
      , self = this;
    a.o = _.defaults(a.o, {
      'rows': 100
    });

    var i = Belt.toArray(ids);

    return M._client.push({'request': {
                             'method': 'GET'
                           , 'url': M.settings.protocol + '://' + M.settings.host + ':' + M.settings.port + M.settings.path + '/select'
                           , 'qs': {'q': _.map(i, function(d){ return 'id:' + d; }).join(' OR ') , 'wt': 'json', 'rows': a.o.rows}
                           , 'json': true
                           }
                         , 'callback': function(err, response, body){
                             return a.cb(err, Belt._get(body, 'response.docs') || []);
                           }
                          });
  };

  M['getById'] = M['getByIds']; //alias

  /*
    Query docs with a focus on flexible full-text searching
  */
  M['textSearch'] = function(text, options, callback){
    var a = Belt.argulint(_.values(arguments).slice(1))
      , self = this;
    a.o = _.defaults(a.o, {
      'query_params': ['defType', 'sort', 'start', 'rows', 'fq', 'fl', 'timeAllowed'
                      , 'wt', 'cache', 'q', 'qf', 'mm', 'qs', 'pf', 'ps', 'pf2', 'ps2'
                      , 'pf3', 'ps3', 'bq', 'bf', 'tie', 'uf']
    , 'defType': 'edismax'
    , 'sort': 'score desc'
    , 'wt': 'json'
    , 'cache': true
    , 'mm': '33%'
    , 'q': text
    , 'rows': 50
    });

    a.o.qf = _.map(a.o.qf, function(v, k){
      if (_.isArray(a.o.qf)) return v;

      return k + (v ? '^' + v : '');
    }).join(' ');

    return M._client.push({'request': {
                             'method': 'GET'
                           , 'url': M.settings.protocol + '://' + M.settings.host + ':' + M.settings.port + M.settings.path + '/select'
                           , 'qs': _.pick(a.o, a.o.query_params)
                           , 'json': true
                           }
                         , 'callback': function(err, response, body){
                             return a.cb(err, Belt._get(body, 'response.docs') || []);
                           }
                          });
  };

  return M;
};
