/*
 * pa1d
 * https://github.com/sackio/pa1d
 *
 * Copyright (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

'use strict';

var Belt = require('jsbelt')
  , _ = require('underscore')
  , Path = require('path')
  , Optionall = require('optionall')
;

module.exports = function(O){
  var M = {}
    , Opts = O || new Optionall({'__dirname': Path.resolve(module.filename + './../..')});

  M.settings = Belt.extend({
    'provider': 'braintree'
  }, Opts);

  M._provider = new require('./providers/' + M.settings.provider + '.js')(M.settings);

  //RESTful methods around a provider's API
  _.each(['create', 'get', 'find', 'update', 'delete'], function(m){

    //CUSTOMER
    M[m + '_customer'] = M._provider[m + '_customer'];

    //PAYMENT METHOD
    M[m + '_payment_method'] = M._provider[m + '_payment_method'];

    //SALE
    M[m + '_sale'] = M._provider[m + '_sale'];

    //PAYMENT
    M[m + '_payment'] = M._provider[m + '_payment'];

    //SUBSCRIPTION
    M[m + '_subscription'] = M._provider[m + '_subscription'];

    return;
  });

  return M;

};


