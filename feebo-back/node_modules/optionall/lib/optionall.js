/*
 * optionall
 * https://github.com/sackio/optionall
 *
 * Copyright (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

'use strict';

var Belt = require('jsbelt')
  , _ = require('underscore')
  , Path = require('path')
  , deepmerge = require('deepmerge')
  , Optimist = require('optimist');

(function(){

  var Options = function(dirname){
    var O = {}
      , args = Belt.argulint(arguments)
      , settings = args.options;

    settings = _.defaults(settings, {
      'dirname_priority': [
        __dirname
      , process.cwd()
      , Path.resolve('./')
      , Belt.isPropDefined(process, 'mainModule.filename') ? Path.dirname(process.mainModule.filename)
                                                           : undefined
      , dirname
      ]
      /*
        the environment is set in order, with any defined value later in the array
        overriding any previous value
      */
    , 'environment_priority': [
         'development'
       , Belt.deepProp(process, 'env.ENV')
       , Belt.deepProp(Optimist, 'argv.ENV')
       , Belt.deepProp(process, 'env.NODE_ENV')
       , Belt.deepProp(Optimist, 'argv.NODE_ENV')
       , Belt.deepProp(settings, 'env')
       , Belt.deepProp(settings, 'environment')
       ]
      /*
        the order to check to find environment settings in files and objects
      */
    , 'environment_key_priority': ['env', 'environment', '']
      /*
        config files will be be loaded and deeply merged in order. Files are relative
        to path
      */
    , 'file_priority': [
         'package.json'
       , 'environments.json'
       , 'config.json'
       ]
      /*
        config objects are in memory. Objects are deepmerged in order
      */
    , 'object_priority': [
         Belt.deepProp(process, 'env')
       , Belt.deepProp(Optimist, 'argv')
       ]
      /*
        create lowercased aliases of variables
      */
    , 'lowercased_aliases': true
    , 'uppercased_aliases': false
    , 'parse_json': true //parse any JSON objects included in settings
    });

    //set value in prioritized order
    var cascade_value = function(array){
      return _.reduce(array, function(e, s){ return s || e; }, undefined);
    };

    //get path relative to config files
    O.__dirname = (typeof dirname === 'string' ? dirname : undefined) || settings.__dirname || cascade_value(settings.dirname_priority);

    //get name of environment
    O.environment = settings.environment || settings.env || cascade_value(settings.environment_priority);

    O.env = O.environment;
    O.node_env = O.environment;
    O.NODE_ENV = O.environment;

    O.argv = Optimist.argv;

    //load environment settings from files
    _.each(settings.file_priority, function(f){
      var json, pkg, index = 0;

      try{ json = require(Path.join(O.__dirname, f)); } catch(e){ return; }

      if (!json) return;

      while (!pkg && index < settings.environment_key_priority.length){
        pkg = Belt.deepProp(json, settings.environment_key_priority[index]
                                ? settings.environment_key_priority[index] + '.' + O.environment
                                : '');
        index++;
      }

      if (pkg) O = deepmerge(O, pkg);
    });

    //load environment settings from objects
    _.each(settings.object_priority, function(f){
      var pkg, index = 0;

      if (!f) return;

      while (!pkg && index < settings.environment_key_priority.length){
        pkg = Belt.deepProp(f, settings.environment_key_priority[index]
                             ? settings.environment_key_priority[index] + '.' + O.environment
                             : '');
        index++;
      }
      if (pkg) O = deepmerge(O, pkg);
    });

    //parse any variables that are valid JSON
    if (settings.parse_json)
      _.each(O, function(v, k){
        if (typeof v === 'object') return;
        try{ O[k] = JSON.parse(v); } catch(e){ O[k] = v; }
        return;
      });

    //create aliases for variables
    if (settings.lowercased_aliases)
      _.each(O, function(v, k){
        var key = k.toLowerCase();
        if (!O[key]) O[key] = v;
        return;
      });

    if (settings.uppercased_aliases)
      _.each(O, function(v, k){
        var key = k.toUpperCase();
        if (!O[key]) O[key] = v;
        return;
      });

    //UTILITY METHODS

    //if passed an option called method, call this method, if it exists, on the main module
    if (!settings.no_commandline && O.method){
      Belt._call.apply(Belt, [require, 'main.exports.' + O.method]
                             .concat(O.args || []).concat([O, Belt.calllog]));
    }

    return O;
  };

  module.exports = Options;

}.call());
