'use strict';

var Paid = new require('../lib/pa1d.js')()
  , Belt = require('jsbelt')
  , Async = require('async')
  , Path = require('path')
  , _ = require('underscore')
  , Optionall = require('optionall')
  , O = new Optionall({'__dirname': Path.resolve(module.filename + './../..')})
;

exports['pa1d'] = {
  setUp: function(done) {
    done();
  },
  'braintree': function(test){
    var gb = {};
    return Async.waterfall([
      function(cb){
        console.log('Create customer...');
        gb.customer = {
          firstName: "Ben",
          lastName: "Smith",
          company: "Braintree",
          email: Belt.uuid() + "@example.com",
          phone: "312.555.1234",
          fax: "614.555.5678",
          website: "www.example.com"
        , 'paymentMethodNonce': Paid._provider._braintree.Test.Nonces.Transactable
        };

        return Paid.create_customer(gb.customer, Belt.cs(cb, gb, 'cust', 1, 0));
      }
    , function(cb){
        _.each(['id', 'firstName', {'merchantId.0': O.braintree.merchantId}, 'creditCards.0.cardType'], function(e){
          if (_.isObject(e)) return test.ok(Belt._get(gb.cust, _.keys(e)[0]) === _.values(e)[0]);
          return test.ok(Belt._get(gb.cust, e));
        });

        return cb();
      }
    , function(cb){
        console.log('Create PayPal customer...');
        gb.customer = {
          firstName: "Ben",
          lastName: "Smith",
          company: "Braintree",
          email: Belt.uuid() + "@example.com",
          phone: "312.555.1234",
          fax: "614.555.5678",
          website: "www.example.com"
        , 'paymentMethodNonce': Paid._provider._braintree.Test.Nonces.PayPalFuturePayment
        };

        return Paid.create_customer(gb.customer, Belt.cs(cb, gb, 'cust2', 1, 0));
      }
    , function(cb){
        _.each(['id', 'firstName', {'merchantId.0': O.braintree.merchantId}, 'paypalAccounts.0.imageUrl'], function(e){
          if (_.isObject(e)) return test.ok(Belt._get(gb.cust2, _.keys(e)[0]) === _.values(e)[0]);
          return test.ok(Belt._get(gb.cust2, e));
        });

        return cb();
      }
    , function(cb){
        console.log('Create erroneous customer...');
        gb.customer = {
          firstName: "John",
          lastName: "Doe",
          company: "Braintree",
          email: Belt.uuid() + "@example.com",
          phone: "312.555.1234",
          fax: "614.555.5678",
          website: "www.example.com"
        , 'paymentMethodNonce': Paid._provider._braintree.Test.Nonces.Consumed
        };

        return Paid.create_customer(gb.customer, Belt.cs(cb, gb, 'err', 0));
      }
    , function(cb){
        test.ok(gb.err);
        return cb();
      }
    , function(cb){
        console.log('Get customer...');
        return Paid.get_customer(gb.cust.id, Belt.cs(cb, gb, 'get', 1, 0));
      }
    , function(cb){
        test.ok(gb.get.id === gb.cust.id);
        return cb();
      }
    , function(cb){
        console.log('Get non-existent customer...');
        return Paid.get_customer(Belt.uuid(), Belt.cs(cb, gb, 'get', 0));
      }
    , function(cb){
        test.ok(gb.get instanceof Error);
        return cb();
      }
    , function(cb){
        console.log('Search for customer...');
        return Paid.find_customer({'email': gb.cust.email}, Belt.cs(cb, gb, 'find', 1, 0));
      }
    , function(cb){
        _.each(gb.find, function(f){
          test.ok(f.firstName === gb.cust.firstName);
          test.ok(f.lastName === gb.cust.lastName);
          test.ok(f.email === gb.cust.email);
        });
        return cb();
      }
    , function(cb){
        console.log('Search for non-existent customer...');
        return Paid.find_customer({'email': Belt.uuid(), 'firstName': gb.cust.firstName, 'lastName': gb.cust.lastName}
               , Belt.cs(cb, gb, 'find', 1, 0));
      }
    , function(cb){
        test.ok(!_.any(gb.find));
        return cb();
      }
    , function(cb){
        console.log('Update customer...');
        gb.email = Belt.uuid() + '@gmail.com';
        return Paid.update_customer(gb.cust.id, {'email': gb.email}, Belt.cs(cb, gb, 'update', 1, 0));
      }
    , function(cb){
        return Paid.get_customer(gb.cust.id, Belt.cs(cb, gb, 'find', 1, 0));
      }
    , function(cb){
        test.ok(gb.find.email === gb.email);
        return cb();
      }
    , function(cb){
        console.log('Delete customer...');
        gb.customer = {
          firstName: "Ben",
          lastName: "Smith",
          company: "Braintree",
          email: "jen@example.com",
          phone: "312.555.1234",
          fax: "614.555.5678",
          website: "www.example.com"
        , 'paymentMethodNonce': Paid._provider._braintree.Test.Nonces.Transactable
        };

        return Paid.create_customer(gb.customer, Belt.cs(cb, gb, 'cust3', 1, 0));
      }
    , function(cb){
        return Paid.get_customer(gb.cust3.id, Belt.cs(cb, gb, 'get', 1, 0));
      }
    , function(cb){
        test.ok(gb.get.id === gb.cust3.id);
        return cb();
      }
    , function(cb){
        return Paid.delete_customer(gb.cust3.id, Belt.cw(cb, 0));
      }
    , function(cb){
        return Paid.get_customer(gb.cust3.id, Belt.cs(cb, gb, 'get', 0));
      }
    , function(cb){
        test.ok(gb.get instanceof Error);
        test.ok(gb.get.message === 'Not Found');
        return cb();
      }
    , function(cb){
        console.log('Create payment method...');
        return Paid.create_payment_method({'customerId': gb.cust2.id, 'paymentMethodNonce': Paid._provider.testing.Nonces.Transactable
               , 'options': {'makeDefault': true, 'verifyCard': true}}, Belt.cw(cb, 0));
      }
    , function(cb){
        return Paid.get_customer(gb.cust2.id, Belt.cs(cb, gb, 'cust2', 1, 0));
      }
    , function(cb){
        test.ok(gb.cust2.creditCards[0].default);
        test.ok(!gb.cust2.paypalAccounts[0].default);
        return cb();
      }
    , function(cb){
        console.log('Create erroneous payment method...');
        return Paid.create_payment_method({'customerId': gb.cust.id, 'paymentMethodNonce': Paid._provider.testing.Nonces.Consumed
               , 'options': {'makeDefault': true, 'verifyCard': true}}, Belt.cs(cb, gb, 'err', 0));
      }
    , function(cb){
        test.ok(gb.err instanceof Error);
        return cb();
      }
    , function(cb){
        console.log('Get payment method...');
        return Paid.get_payment_method(gb.cust.creditCards[0].token, Belt.cs(cb, gb, 'get', 1, 0));
      }
    , function(cb){
        test.ok(gb.get.customerId === gb.cust.id);
        return cb();
      }
    //Braintree only allows updating billing addresses on payment methods
    /*, function(cb){
        console.log('Update payment method...');

        return Paid.update_payment_method(gb.cust2.paypalAccounts[0].token, {'default': true}, Belt.cw(cb, 0));
      }
    , function(cb){
        return Paid.get_payment_method(gb.cust2.paypalAccounts[0].token, Belt.cs(cb, gb, 'get', 1, 0));
      }
    , function(cb){
        test.ok(gb.get.customerId === gb.cust2.id);
        test.ok(gb.get.default);
        return cb();
      }*/
    , function(cb){
        console.log('Delete payment method...');
        return Paid.delete_payment_method(gb.cust2.paypalAccounts[0].token, Belt.cw(cb, 0));
      }
    , function(cb){
        return Paid.get_customer(gb.cust2.id, Belt.cs(cb, gb, 'cust2', 1, 0));
      }
    , function(cb){
        test.ok(gb.cust2.creditCards[0].default);
        test.ok(!_.any(gb.cust2.paypalAccounts));
        return cb();
      }
    , function(cb){
        console.log('Create simple sale...');
        gb.amount = Belt.random_int(2, 23);
        return Paid.create_sale({'amount': gb.amount, 'paymentMethodNonce': Paid._provider.testing.Nonces.Transactable}
               , Belt.cs(cb, gb, 'sale', 1, 0));
      }
    , function(cb){
        test.ok(gb.sale.status === 'authorized');
        test.ok(gb.sale.amount === gb.amount.toFixed(2).toString());
        return cb();
      }
    , function(cb){
        console.log('Charge a customer...');
        gb.amount = Belt.random_int(50, 75);
        return Paid.create_sale({'amount': gb.amount, 'customerId': gb.cust2.id}, Belt.cs(cb, gb, 'sale', 1, 0));
      }
    , function(cb){
        test.ok(gb.sale.status === 'authorized');
        test.ok(gb.sale.amount === gb.amount.toFixed(2).toString());
        return cb();
      }
    , function(cb){
        console.log('Charge a payment method...');
        gb.amount = Belt.random_int(24, 33);
        return Paid.create_sale({'amount': gb.amount, 'paymentMethodToken': gb.cust2.creditCards[0].token
                               , 'options': {'submitForSettlement': true}}, Belt.cs(cb, gb, 'sale', 1, 0));
      }
    , function(cb){
        test.ok(gb.sale.status === 'submitted_for_settlement');
        test.ok(gb.sale.amount === gb.amount.toFixed(2).toString());
        test.ok(gb.sale.creditCard.token === gb.cust2.creditCards[0].token);
        return cb();
      }
    , function(cb){
        console.log('Get sale...');
        return Paid.get_sale(gb.sale.id, Belt.cs(cb, gb, 'get', 1, 0));
      }
    , function(cb){
        test.ok(gb.get.id === gb.sale.id);
        return cb();
      }
    , function(cb){
        console.log('Search for sale...');
        return Paid.find_sale({'amount': gb.amount}, Belt.cs(cb, gb, 'find', 1, 0));
      }
    , function(cb){
        test.ok(_.any(gb.find));
        _.each(gb.find, function(f){
          return test.ok(f.amount === gb.amount.toFixed(2).toString());
        });
        test.ok(_.some(gb.find, function(f){
          return f.id === gb.sale.id;
        }));
        return cb();
      }
    , function(cb){
        console.log('Void sale...');
        return Paid.delete_sale(gb.sale.id, Belt.cw(cb, 0));
      }
    , function(cb){
        return Paid.get_sale(gb.sale.id, Belt.cs(cb, gb, 'get', 1, 0));
      }
    , function(cb){
        test.ok(gb.get.status === 'voided');
        return cb();
      }
    , function(cb){
        console.log('Refund sale...');
        gb.amount = Belt.random_int(2, 23);
        return Paid.create_sale({'amount': gb.amount, 'paymentMethodNonce': Paid._provider.testing.Nonces.Transactable}
               , Belt.cs(cb, gb, 'sale', 1, 0));
      }
    , function(cb){
        return Paid.delete_sale(gb.sale.id, {'skip_void': true}, Belt.cs(cb, gb, 'err', 0));
      }
    , function(cb){
        test.ok(gb.err instanceof Error);
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);
      return test.done();
    });
  },
};
