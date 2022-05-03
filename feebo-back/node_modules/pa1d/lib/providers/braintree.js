/*
  Braintree API - http://apidocs.mailchimp.com/api/2
*/

var Belt = require('jsbelt')
  , Async = require('async')
  , Gateway = require('braintree')
  , _ = require('underscore')

;

(function(){
  var Braintree = function(O){
    var B = {};

    //SETTINGS

    B.settings = Belt.extend({

    }, O, O.braintree);
    B.settings.environment = Gateway.Environment[B.settings.environment];

    B._gateway = Gateway.connect(B.settings);
    B._braintree = Gateway;
    B.testing = B._braintree.Test; //values for testing

    B._api_objects = {
      'customers': ['firstName', 'lastName', 'company', 'email', 'phone'
                  , 'website', 'fax', 'addresses', 'creditCards', 'paypalAccounts'
                  , 'customFields', 'createdAt', 'updatedAt', 'paymentMethodNonce', 'options']
    , 'addresses': ['company', 'countryCodeAlpha2', 'countryCodeAlpha3'
                   , 'countryCodeNumeric', 'countryName', 'customerId'
                   , 'extendedAddress', 'firstName', 'lastName', 'locality'
                   , 'postalCode', 'region', 'streetAddress', 'createdAt', 'updatedAt', 'options']
    , 'creditCards': ['token', 'bin', 'cardType', 'cardholderName', 'customerId'
                     , 'expirationMonth', 'expirationYear', 'expirationDate'
                     , 'last4', 'maskedNumber', 'uniqueNumberIdentifier'
                     , 'countryOfIssuance', 'issuingBank', 'imageUrl', 'default'
                     , 'prepaid', 'payroll', 'commercial', 'durbinRegulated'
                     , 'healthcare', 'debit', 'countryOfIssuance', 'issuingBank'
                     , 'createdAt', 'updatedAt', 'subscriptions', 'billingAddress', 'paymentMethodNonce', 'options']
    , 'paypalAccounts': ['token', 'email', 'imageUrl', 'default', 'subscriptions', 'paymentMethodNonce', 'options']
    , 'transactions': ['id', 'customerDetails', 'creditCardDetails', 'amount'
                      , 'channel', 'createdAt', 'currencyIsoCode', 'customFields', 'customerId'
                      , 'cvvResponseCode', 'gatewayRejectionReason', 'merchantAccountId'
                      , 'orderId', 'billingDetails', 'disbursementDetails', 'escrowStatus'
                      , 'shippingDetails', 'processorAuthorizationCode'
                      , 'processorResponseCode', 'refundIds', 'refundedTransactionId'
                      , 'status', 'statusHistory', 'serviceFeeAmount'
                      , 'subscriptionId', 'subscriptionDetails', 'addOns'
                      , 'discounts', 'type', 'updatedAt', 'vaultBillingAddress'
                      , 'vaultCreditCard', 'vaultCustomer', 'vaultShippingAddress'
                      , 'avsErrorResponseCode', 'avsPostalCodeResponseCode'
                      , 'avsStreetAddressResponseCode', 'paymentMethodNonce', 'paymentMethodToken', 'dispute', 'options']
    , 'subscriptions': ['id', 'balance', 'billingDayOfMonth', 'billingPeriodEndDate'
                       , 'billingPeriodStartDate', 'failureCount', 'firstBillingDate'
                       , 'merchantAccountId', 'nextBillingDate', 'numberOfBillingCycles'
                       , 'nextBillingPeriodAmount', 'paidThroughDate', 'paymentMethodToken'
                       , 'planId', 'price', 'status', 'trialDuration', 'trialDurationUnit'
                       , 'trialPeriod', 'neverExpires', 'addOns', 'discounts', 'transactions', 'paymentMethodNonce', 'options']
    };

    //UTILITIES
    var obj_pick = function(name, obj){
      if (_.isArray(obj)){
        return _.map(obj, function(o){ return _.pick(o. B._api_objects.name); });
      } else if (!obj){
        return obj;
      } else {
        return _.pick(obj, B._api_objects.name);
      }
    };

    B.cw = function(pStr, cb){
      return function(err, res){
        if (err) return cb(err);
        if (!Belt._get(res, 'success')) return cb(new Error(Belt._get(res, 'message') || 'An unknown error occur'));

        return cb(null, Belt._get(res, pStr));
      };
    };

    //return function with searching criteria
    var searchCrit = function(obj, name, callback){
      if (!obj) return Belt.noop;

      var s = _.pick(obj, B._api_objects[name + 's']);

      var stream = B._gateway[name].search(function(search){
          _.each(s, function(v, k){
            if (_.isObject(v)) return search[k].call(search)[v.op](v.val, v.val2);

            return search[k].call(search).is(v);
          });
        })
      , results = []
      , err;

      stream.on('data', function(r){
        return results.push(r);
      });
      stream.on('error', function(e){
        return err = e;
      });
      return stream.on('end', function(){
        return callback(err, results);
      });
    };

    //CUSTOMERS

    /*
      Create customer
    */
    B['create_customer'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      var req = _.pick(a.o, B._api_objects.customers);
      if (!_.isUndefined(req.addresses)) req.addresses = obj_pick('addresses', req.addresses);
      if (!_.isUndefined(req.creditCards)) req.creditCards = obj_pick('creditCards', req.creditCards);
      if (!_.isUndefined(req.paypalAccounts)) req.paypalAccounts = obj_pick('paypalAccounts', req.paypalAccounts);

      return B._gateway.customer.create(req, B.cw('customer', a.cb));
    };

    /*
      Get customer
    */
    B['get_customer'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.customer.find(identifier, a.cb);
    };

    /*
      Find customer
    */
    B['find_customer'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return searchCrit(a.o, 'customer', a.cb);
    };

    /*
      Update customer
    */
    B['update_customer'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      var req = _.pick(a.o, B._api_objects.customers);
      if (!_.isUndefined(req.addresses)) req.addresses = obj_pick('addresses', req.addresses);
      if (!_.isUndefined(req.creditCards)) req.creditCards = obj_pick('creditCards', req.creditCards);
      if (!_.isUndefined(req.paypalAccounts)) req.paypalAccounts = obj_pick('paypalAccounts', req.paypalAccounts);

      return B._gateway.customer.update(identifier, req, B.cw('customer', a.cb));
    };

    /*
      Delete customer
    */
    B['delete_customer'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.customer.delete(identifier, a.cb);
    };

    //PAYMENT METHODS

    /*
      Create payment method
    */
    B['create_payment_method'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {
        'paypal': false
      });

      var req = _.pick(a.o, B._api_objects[a.o.paypal ? 'paypalAccounts' : 'creditCards']);
      if (!_.isUndefined(req.billingAddress)) req.billingAddress = obj_pick('addresses', req.billingAddress);
      if (!_.isUndefined(req.subscriptions)) req.subscriptions = obj_pick('subscriptions', req.subscriptions);

      return B._gateway.paymentMethod.create(req, B.cw('paymentMethod', a.cb));
    };

    /*
      Get payment method
    */
    B['get_payment_method'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.paymentMethod.find(identifier, a.cb);
    };

    /*
      Find payment method - Braintree does not support this, search on customer
    */

    /*
      Update payment method
    */
    B['update_payment_method'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      var req = _.pick(a.o, B._api_objects[a.o.paypal ? 'paypalAccounts' : 'creditCards']);
      if (!_.isUndefined(req.billingAddress)) req.billingAddress = obj_pick('addresses', req.billingAddress);
      if (!_.isUndefined(req.subscriptions)) req.subscriptions = obj_pick('subscriptions', req.subscriptions);

      return B._gateway.paymentMethod.update(identifier, req, B.cw('paymentMethod', a.cb));
    };

    /*
      Delete payment method
    */
    B['delete_payment_method'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.paymentMethod.delete(identifier, a.cb);
    };

    //SALES METHODS

    /*
      Create sale
    */
    B['create_sale'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      var req = _.pick(a.o, B._api_objects.transactions);

      return B._gateway.transaction.sale(req, B.cw('transaction', a.cb));
    };

    /*
      Get sale
    */
    B['get_sale'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.transaction.find(identifier, a.cb);
    };

    /*
      Find sale
    */
    B['find_sale'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return searchCrit(a.o, 'transaction', a.cb);
    };

    /*
      Update sale - N/A
    */
    
    /*
      Delete sale  - refund or void - options.amount will result in partial refund
    */
    B['delete_sale'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments)
        , globals = {};

      a.o = _.defaults(a.o, {

      });

      return Async.waterfall([
        function(cb){
          if (a.o.skip_void) return cb();

          return B._gateway.transaction.void(identifier
          , B.cw('transaction', Belt.cs(cb, globals, 'err', 0)));
        }
      , function(cb){
          if (!a.o.skip_void && !globals.err) return cb();
          if (a.o.skip_refund) return cb(new Error('Sale could not be voided or refunded'));

          var args = [identifier];
          if (a.o.amount) args.push(a.o.amount);
          args.push(B.cw('transaction', cb));
          return B._gateway.transaction.refund.apply(B._gateway.transaction, args);
        }
      ], a.cb);
    };

    //SUBSCRIPTIONS

    /*
      Create subscription
    */
    B['create_subscription'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      var req = _.pick(a.o, B._api_objects.subscriptions);

      return B._gateway.subscription.create(req, B.cw('subscription', a.cb));
    };

    /*
      Get subscription
    */
    B['get_subscription'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.subscription.find(identifier, a.cb);
    };

    /*
      Find subscription
    */
    B['find_subscription'] = function(options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return searchCrit(a.o, 'subscription', a.cb);
    };

    /*
      Update subscription
    */
    B['update_subscription'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      var req = _.pick(a.o, B._api_objects.subscriptions);

      return B._gateway.subscription.update(identifier, req, B.cw('subscription', a.cb));
    };

    /*
      Delete subscription
    */
    B['delete_subscription'] = function(identifier, options, callback){
      var a = Belt.argulint(arguments);

      a.o = _.defaults(a.o, {

      });

      return B._gateway.subscription.cancel(identifier, a.cb);
    };

    return B;
  };

  return module.exports = Braintree;

}).call(this);

