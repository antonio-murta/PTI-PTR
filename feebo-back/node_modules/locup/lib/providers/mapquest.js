/*
  Mapquest APIs for geocoding and geolocation
*/

var Belt = require('jsbelt')
  , Async = require('async')
  , Request = require('request')
  , _ = require('underscore')
  ;

(function(){
  var Mapquest = function(O){
    var G = {};

    //SETTINGS

    G.settings = Belt.extend({
      'throttle_delay': 100
    , 'pool': 1
    }, O, O.mapquest || {});
    G.settings.url = G.settings.url || 'http://www.mapquestapi.com/geocoding/v1';

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

    //BASE REQUESTS

    G.geocode = function(address, options, callback){
      var a = Belt.argulint(arguments);
      a.o = _.defaults(a.o, {
        'key': G.settings.key
      , 'outFormat': 'json'
      , 'location': address
      });

      return G._client.push({'request': {
        'uri': G.settings.url + '/address?key=' + a.o.key + '&outFormat=' + a.o.outFormat + '&location=' + a.o.location
      , 'json': true
      }, 'callback': function(err, resp, body){
        if (err) return a.cb(err);
        if (Belt._get(body, 'info.statuscode') !== 0) return a.cb(new Error(Belt._call(body, 'info.messages.join', '')
                                                                 || 'Non-OK status occured'));

        var loc = G.format(body);
        return a.cb(loc instanceof Error ? loc : undefined, loc instanceof Error ? undefined : loc);
      }});
    };

    G.reverse_geocode = function(lat, long, options, callback){
      var a = Belt.argulint(arguments);
      a.o = _.defaults(a.o, {
        'key': G.settings.key
      , 'outFormat': 'json'
      , 'location': [lat, long].join(',')
      });

      return G._client.push({'request': {
        'uri': G.settings.url + '/reverse?key=' + a.o.key + '&outFormat=' + a.o.outFormat + '&location=' + a.o.location
      , 'json': true
      }, 'callback': function(err, resp, body){
        if (err) return a.cb(err);
        if (Belt._get(body, 'info.statuscode') !== 0) return a.cb(new Error(Belt._call(body, 'info.messages.join', '')
                                                                 || 'Non-OK status occured'));
        var loc = G.format(body);
        return a.cb(loc instanceof Error ? loc : undefined, loc instanceof Error ? undefined : loc);
      }});
    };

    G.format = function(body){
      var res = Belt._get(body, 'results') || []
        , loc = Belt.toArray(Belt.deArray(_.pluck(res, 'locations')));

      if (!_.any(loc)) return new Error('No results found');

      loc = _.map(loc, function(l){
        var _l = {}
          , ll = Belt._get(l, 'latLng')
          , fa = {'street': '', 'city': '', 'state': '', 'country': '', 'zip': ''}
          , ac = _.chain(l)
                  //.tap(function(d){ console.log(d.geocodeQualityCode); })
                  .pick(['street', 'adminArea6', 'adminArea5', 'adminArea4', 'adminArea3'
                        , 'adminArea1', 'postalCode', 'sideOfStreet'])
                  .pairs()
                  .map(function(c){
                    if (!Belt._get(c, '1')) return undefined;

                    switch(c[0]){
                      case 'street': c[0] = ['street_number', 'street_address', 'route']; fa.street = c[1]; break;
                      case 'adminArea5': c[0] = ['locality', 'political']; fa.city = c[1]; break;
                      case 'adminArea4': c[0] = ['administrative_area_level_2', 'political']; break;
                      case 'adminArea3': c[0] = ['administrative_area_level_1', 'political']; fa.state = c[1]; break;
                      case 'adminArea1': c[0] = ['country', 'political']; fa.country = c[1]; break;
                      case 'postalCode': c[0] = ['postal_code']; fa.zip = c[1]; break;
                      default: c[0] = [c[0]];
                    }

                    return {
                      'long_name': c[1]
                    , 'short_name': c[1]
                    , 'types': c[0]
                    };
                  })
                  .compact()
                  .value();


        if (ll) Belt._set(_l, 'geometry.location', ll);

        Belt._set(_l, 'address_components', ac);
        Belt._set(_l, 'types', ['mapquest']);
        Belt._set(_l, 'formatted_address', _.compact([fa.street, fa.city, fa.state, fa.country, fa.zip]).join(', '));

        return _l;
      });

      return Belt.deArray(Belt.deArray(loc));
    };

    return G;
  };

  return module.exports = Mapquest; 

}).call(this);
