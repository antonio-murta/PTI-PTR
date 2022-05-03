var Belt = require('jsbelt')
  , Optionall = require('optionall')
  , Path = require('path')
  , O = new Optionall({'__dirname': Path.resolve(module.filename + '/../..')})
  , Async = require('async')
  , _ = require('underscore')
  , Locup = new require('../lib/locup.js')(_.extend({'api_key': O.google.server_api_key}, O))
;

exports['units'] = {
  'geocode': function(test) {
    var globals = {};

    return Async.waterfall([
      function(cb){
        console.log(1);

        globals.address1 = '1600 Pennsylvania Avenue, Washington, DC, US';
        globals.address2 = 'San Francisco, California, US';
        globals.address3 = 'Tokyo, Japan';
        globals.address4 = 'Never-Never Land, Peter Pan, Fictional';
        return cb();
      }
    , function(cb){
        console.log(2);

        return Locup.geocode(globals.address1, Belt.cs(cb, globals, 'geo1', 1, 0));
      }
    , function(cb){
        console.log(3);

        return Locup.geocode(globals.address2, Belt.cs(cb, globals, 'geo2', 1, 0));
      }
    , function(cb){
        console.log(4);

        return Locup.geocode(globals.address3, Belt.cs(cb, globals, 'geo3', 1, 0));
      }
    , function(cb){
        console.log(5);

        return Locup.geocode(globals.address4, function(err){
          test.ok(err);
          return cb();
        });
      }
    , function(cb){
        console.log(6);

        test.ok(globals.geo1);
        test.ok(globals.geo2);
        test.ok(globals.geo3);

        return cb();
      }
    , function(cb){
        console.log(7);

        return Locup.get_coordinates(globals.address1, Belt.cs(cb, globals, 'coords', 1, 0));
      }
    , function(cb){
        console.log(8);

        return Locup.get_formatted_address(globals.address1, Belt.cs(cb, globals, 'addr', 1, 0));
      }
    , function(cb){
        console.log(9);

        return Locup.get_components(globals.address1, 'street_number', Belt.cs(cb, globals, 'streetnum', 1, 0));
      }
    , function(cb){
        console.log(10);

        return Locup.get_components(globals.address3, 'country', Belt.cs(cb, globals, 'country', 1, 0));
      }
    /*, function(cb){
        console.log(11);

        test.ok(globals.addr);
        test.ok(globals.coords);
        test.ok(Belt.deepEqual(globals.coords, globals.geo1.geometry.location));
        test.ok(Belt.deepEqual(globals.addr, globals.geo1.formatted_address));
        test.ok(globals.streetnum === '1600');
        test.ok(globals.country === 'Japan');

        return cb();
      }*/
    , function(cb){
        console.log(12);

        globals.geo5 = [40.689167, -74.044444];
        return Locup.reverse_geocode(globals.geo5[0], globals.geo5[1], Belt.cs(cb, globals, 'rev1', 1, 0));
      }
    , function(cb){
        test.ok(_.some(globals.rev1, function(r){ return r.formatted_address.match(/1 Liberty Island/); }));
        return cb();
      }
/*    , function(cb){
        console.log(13);

        return Locup.providers.google.get_address_components(globals.geo5[0], globals.geo5[1]
               , 'locality', Belt.cs(cb, globals, 'locality', 1, 0));
      }
    , function(cb){
        console.log(14);

        test.ok(globals.locality[0] === 'New York');
        return cb();
      }
    , function(cb){
        console.log(15);

        return Locup.providers.mapquest.geocode(globals.address1, Belt.cs(cb, globals, 'geo1b', 1, 0));
      }
    , function(cb){
        console.log(16);

        return Locup.providers.mapquest.geocode(globals.address2, Belt.cs(cb, globals, 'geo2b', 1, 0));
      }
    , function(cb){
        console.log(17);

        return Locup.providers.mapquest.geocode(globals.address3, Belt.cs(cb, globals, 'geo3b', 1, 0));
      }
    , function(cb){
        console.log(18);

        return Locup.providers.mapquest.reverse_geocode(globals.geo5[0], globals.geo5[1], Belt.cs(cb, globals, 'geo5b', 1, 0));
      }
    , function(cb){
        console.log(19);

        return Locup.providers.mapquest.geocode(globals.address4, function(err, res){
          //test.ok(err);
          return cb();
        });
      }
    , function(cb){
        console.log(20);

        test.ok(globals.geo1b);
        test.ok(globals.geo2b);
        test.ok(globals.geo3b);
        test.ok(globals.geo5b);

        return cb();
      }
    , function(cb){
        console.log(JSON.stringify(globals.geo5b, null, 2));
        return cb();
      }*/
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);
      return test.done();
    });
  }
};
