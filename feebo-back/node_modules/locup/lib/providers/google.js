/*
  Google APIs for geocoding and geolocation
*/

var Belt = require('jsbelt')
  , Async = require('async')
  , Request = require('request')
  , _ = require('underscore')
  ;

(function(){
  var Google = function(O){
    var G = {};

    //SETTINGS

    G.settings = Belt.extend({
      'throttle_delay': 300
    , 'pool': 1
    }, O);
    G.settings.url = G.settings.url || 'https://maps.googleapis.com/maps/api/geocode/json';

    //ENUMS

    /*
      Throttle requests to API through this queue
    */
    G._client = Async.queue(function(task, cb){
      return Request(task.request, function(){
        task.callback.apply(this, arguments);
        return setTimeout(cb, G.settings.throttle_delay);
      });
    }, G.settings.pool);

    G.result_types = ['street_address', 'route', 'intersection', 'political', 'country', 'administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3', 'administrative_area_level_4', 'administrative_area_level_5', 'colloquial_area', 'locality', 'ward', 'sublocality', 'neighborhood', 'premise', 'subpremise', 'postal_code', 'natural_feature', 'airport', 'park', 'point_of_interest', 'floor', 'establishment', 'parking', 'post_box', 'postal_town', 'room', 'street_number', 'bus_station', 'train_station', 'transit_station'];

    G.location_types = ['ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'];

    G.status_codes = ['OK', 'ZERO_RESULTS', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'INVALID_REQUEST', 'UNKNOWN_ERROR'];

    //BASE REQUESTS

    G.geocode = function(address, options, callback){
      var a = Belt.argulint(arguments);
      a.o = _.defaults(a.o, {
        'language': 'en'
      , 'key': G.settings.api_key
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

      return G._client.push({'request': {
        'uri': G.settings.url
      , 'qs': a.o
      , 'json': true
      }, 'callback': function(err, resp, body){
        if (err) return a.cb(err);
        if (Belt._get(body, 'status') !== 'OK') return a.cb(new Error(Belt._get(body, 'status') || 'Non-OK status occured'));
        return a.cb(null, Belt.deArray(Belt._get(body, 'results')));
      }});
    };

    G.reverse_geocode = function(lat, long, options, callback){
      var a = Belt.argulint(arguments);
      a.o = _.defaults(a.o, {
        'latlng': [lat, long].join(',')
      , 'language': 'en'
      , 'key': G.settings.api_key
      , 'multiple': false
      });

      if (a.o.result_type) a.o.result_type = Belt.toArray(a.o.result_type).join('|');
      if (a.o.location_type) a.o.result_type = Belt.toArray(a.o.location_type).join('|');

      return G._client.push({'request': {
        'uri': G.settings.url
      , 'qs': a.o
      , 'json': true
      }, 'callback': function(err, resp, body){
        if (err) return a.cb(err);
        if (Belt._get(body, 'status') !== 'OK')
          return a.cb(new Error(Belt._get(body, 'status') || 'Non-OK status occured'));
        return a.cb(null, Belt.deArray(Belt._get(body, 'results')));
      }});
    };

    //CONVENIENCE METHODS

    /* 
      Slim down address components into a single hash of key-values
    */
    G.address_components_to_obj = function(components, options){
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
    G.get_coordinates = function(address, options, callback){
      var a = Belt.argulint(arguments);
      return G.geocode(address, a.o, function(err, results){
        return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'geometry.location')));
      });
    };

    /*
      Pass to callback the sw lat/lng and ne lat/lng
    */
    G.get_bounds = function(address, options, callback){
      var a = Belt.argulint(arguments);
      return G.geocode(address, a.o, function(err, results){
        return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'geometry.bounds')));
      });
    };

    /*
      Pass to callback the formatted, human-readable address for a given address string
    */
    G.get_formatted_address = function(address, options, callback){
      var a = Belt.argulint(arguments);
      return G.geocode(address, a.o, function(err, results){
        return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'formatted_address')));
      });
    };

    /*
      Pass to callback the address components for given address string, as returned by the API
    */
    G.get_formatted_address_components = function(address, options, callback){
      var a = Belt.argulint(arguments);

      return G.geocode(address, a.o, function(err, results){
        return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'address_components')));
      });
    };

    /*
      Pass to callback the requested component or an object of multiple components (if components is an array)
    */
    G.get_components = function(address, components, options, callback){
      var a = Belt.argulint(arguments);
      a.o = _.defaults(a.o, {
        'whitelist': components ? Belt.toArray(components) : undefined
      });
      return G.get_formatted_address_components(address, a.o, function(err, comps){
        if (err) return a.cb(err);

        var c_ar = _.isArray(comps[0]) ? comps : [comps]
          , obj = _.map(c_ar, function(c){ return G.address_components_to_obj(c, a.o); });

        return a.cb(null, Belt.deArray(obj));
      });
    };

    //REVERSE GEOCODING - TAKE COORDINATES

    /*
      Pass to callback the formatted, human-readable address for given coordinates
    */
    G.get_address = function(lat, long, options, callback){
      var a = Belt.argulint(arguments);
      return G.reverse_geocode(lat, long, a.o, function(err, results){
        return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'formatted_address')));
      });
    };

    /*
      Pass to callback the address components for given coordinates, as returned by the API
    */
    G.get_raw_address_components = function(lat, long, options, callback){
      var a = Belt.argulint(arguments);
      
      return G.reverse_geocode(lat, long, a.o, function(err, results){
        return a.cb(err, Belt.deArray(Belt.deepPluck(Belt.toArray(results), 'address_components')));
      });
    };

    /*
      Pass to callback the requested component or an object of multiple components (if components is an array)
    */
    G.get_address_components = function(lat, long, components, options, callback){
      var a = Belt.argulint(arguments);
      a.o = _.defaults(a.o, {
        'whitelist': components ? Belt.toArray(components) : undefined
      });
      return G.get_raw_address_components(lat, long, a.o, function(err, comps){
        if (err) return a.cb(err);

        var c_ar = _.isArray(comps[0]) ? comps : [comps]
          , obj = _.map(c_ar, function(c){ return G.address_components_to_obj(c, a.o); });

        return a.cb(null, Belt.deArray(obj));
      });
    };

    return G;
  };

  return module.exports = Google; 

}).call(this);
