/*
 * locup
 * https://github.com/sackio/locup
 *
 * Copyright (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

'use strict';

var Belt = require('jsbelt')
  , _ = require('underscore')
  , Async = require('async')
  , Request = require('request')
;

module.exports = function(O){
  var L = {};
  L.settings = _.extend({
    'locup_provider': 'google'
  , 'throttle_delay': 300
  , 'pool': 1
  }, O);

  _.extend(L.settings, O[L.settings.locup_provider] || {});

  L.settings.url = 'https://maps.googleapis.com/maps/api/geocode/json';

  //ENUMS

  /*
    Throttle requests to API through this queue
  */
  L._client = Async.queue(function(task, cb){
    return Request(task.request, function(){
      task.callback.apply(this, arguments);
      return setTimeout(cb, L.settings.throttle_delay);
    });
  }, L.settings.pool);

  //BASE REQUESTS
  L.geocode = function(address, options, callback){
    var a = Belt.argulint(arguments);
    a.o = _.defaults(a.o, {
      'language': 'en'
    , 'key': L.settings.key
    });

    if (_.isObject(address)){
      a.o.components = address;
    } else {
      a.o.address = Belt._call(address, 'replace', /\s+/g, '+');
    }

    if (a.o.components) a.o.components = _.map(a.o.components, function(v, k){
      return k + ':' + v;
    }).join('|');

    if (a.o.bounds) a.o.bounds = Belt.toArray(a.o.bounds).join('|');

    return L._client.push({'request': {
      'uri': L.settings.url
    , 'qs': a.o
    , 'json': true
    }, 'callback': function(err, resp, body){
      if (err) return a.cb(err);
      if (Belt.get(body, 'status') !== 'OK') return a.cb(new Error(Belt.get(body, 'status') || 'Non-OK status occured'));
      return a.cb(null, Belt.deArray(Belt.get(body, 'results')));
    }});
  };

  L.reverse_geocode = function(lat, long, options, callback){
    var a = Belt.argulint(arguments);
    a.o = _.defaults(a.o, {
      'latlng': [lat, long].join(',')
    , 'language': 'en'
    , 'key': L.settings.key
    , 'multiple': false
    });

    if (a.o) a.o.result_type = Belt.toArray(a.o.result_type).join('|');
    if (a.o.location_type) a.o.result_type = Belt.toArray(a.o.location_type).join('|');

    return L._client.push({'request': {
      'uri': L.settings.url
      , 'qs': a.o
      , 'json': true
    }, 'callback': function(err, resp, body){
      if (err) return a.cb(err);
      if (Belt._get(body, 'status') !== 'OK')
        return a.cb(new Error(Belt.get(body, 'status') || 'Non-OK status occured'));
      return a.cb(null, Belt.deArray(Belt.get(body, 'results')));
    }});
  };

  //CONVENIENCE METHODS

  /* 
    Slim down address components into a single hash of key-values
  */
  L.address_components_to_obj = function(components, options){
    var o = options || {};
    o = _.defaults(o, {
      'types_index': 0
    , 'name': 'long_name'
    , 'whitelist': false
    });

    var obj = _.object(Belt.deepPluck(components, 'types.' + o.types_index)
                      , _.pluck(components, o.name));

    if (o.whitelist) obj = _.pick(obj, o.whitelist);
    var vals = _.values(obj);
    return vals.length === 1 ? vals[0] : (vals.length === 0 ? undefined : obj);
  };

  //GEOCODING - TAKE AN ADDRESS

  /*
    Pass to callback the lat/long of a given address
  */
  L.get_coordinates = function(address, options, callback){
    var a = Belt.argulint(arguments);
    return L.geocode(address, a.o, function(err, results){
      return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'geometry.location')));
    });
  };

  /*
    Pass to callback the sw lat/lng and ne lat/lng
  */
  L.get_bounds = function(address, options, callback){
    var a = Belt.argulint(arguments);
    return L.geocode(address, a.o, function(err, results){
      return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'geometry.bounds')));
    });
  };

  /*
    Pass to callback the formatted, human-readable address for a given address string
  */
  L.get_formatted_address = function(address, options, callback){
    var a = Belt.argulint(arguments);
    return L.geocode(address, a.o, function(err, results){
      return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'formatted_address')));
    });
  };

  /*
    Pass to callback the address components for given address string, as returned by the API
  */
  L.get_formatted_address_components = function(address, options, callback){
    var a = Belt.argulint(arguments);
    return L.geocode(address, a.o, function(err, results){
      return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'address_components')));
    });
  };

  /*
    Pass to callback the requested component or an object of multiple components (if components is an array)
  */
  L.get_components = function(address, components, options, callback){
    var a = Belt.argulint(arguments);
    a.o = _.defaults(a.o, {
      'whitelist': components ? Belt.toArray(components) : undefined
    });
    return L.get_formatted_address_components(address, a.o, function(err, comps){
      if (err) return a.cb(err);
      var c_ar = _.isArray(comps[0]) ? comps : [comps]
        , obj = _.map(c_ar, function(c){ return L.address_components_to_obj(c, a.o); });
      return a.cb(null, Belt.deArray(obj));
    });
  };

  //REVERSE GEOCODING - TAKE COORDINATES
  /*
    Pass to callback the formatted, human-readable address for given coordinates
  */
  L.get_address = function(lat, long, options, callback){
    var a = Belt.argulint(arguments);
    return L.reverse_geocode(lat, long, a.o, function(err, results){
      return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'formatted_address')));
    });
  };

  /*
    Pass to callback the address components for given coordinates, as returned by the API
  */
  L.get_raw_address_components = function(lat, long, options, callback){
    var a = Belt.argulint(arguments);
    
    return L.reverse_geocode(lat, long, a.o, function(err, results){
      return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'address_components')));
    });
  };

  /*
    Pass to callback the requested component or an object of multiple components (if components is an array)
  */
  L.get_address_components = function(lat, long, components, options, callback){
    var a = Belt.argulint(arguments);
    a.o = _.defaults(a.o, {
      'whitelist': components ? Belt.toArray(components) : undefined
    });
    return L.get_raw_address_components(lat, long, a.o, function(err, comps){
      if (err) return a.cb(err);
      var c_ar = _.isArray(comps[0]) ? comps : [comps]
        , obj = _.map(c_ar, function(c){ return L.address_components_to_obj(c, a.o); });
      return a.cb(null, Belt.deArray(obj));
    });
  };

  return L;

};
