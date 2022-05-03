/*
 * rol
 * https://github.com/sackio/rol
 *
 * Copyright (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

(function(){
  var Rol = function(){
    var R = {};

    R['rol'] = function(acObj, method, args, options){
      var a = {
        'acObj': acObj || {}
      , 'methObj': {
          'method': method || ''
        , 'args': args || []
        }
      , 'o': options || {}
      , 'self': this
      };
      var l_a = a.methObj.args[a.methObj.args.length - 1];
      a.o.cb = a.o.cb || (l_a instanceof Function ? l_a : undefined);
      a.o.async = a.o.async || (typeof a.o.cb !== 'undefined');
      a.o.sync = a.o.sync || !a.o.async;

      if (a.o.sync){
        var rval, r;
        for (var i = 0; i < R.rules.length; i++){
          r = R.rules[i];
          if (!r) continue;

          if (!(r instanceof Function)){
            if (!r.handler) continue;

            if (typeof r.selector === 'string' && r.selector !== a.methObj.method) continue;
            if (r.selector instanceof RegExp && !a.methObj.method.match(r.selector)) continue;
            if (r.selector instanceof Function && !r.selector.apply(a.self, [a.methObj.method, a.methObj.args])) continue;

            r = r.handler;
          }

          rval = r.apply(a.self, [a.acObj, a.methObj]);
          if (rval) break;
        }
        return rval ? rval : (a.self[a.methObj.method].apply ? a.self[a.methObj.method].apply(a.self, a.methObj.args)
                                                             : a.self[a.methObj.method]);
      } else {
        return R._asyncSeries(R.rules, function(r, cb){
          if (!r) return cb();

          if (!(r instanceof Function)){
            if (!r.handler) return cb();

            if (typeof r.selector === 'string' && r.selector !== a.methObj.method) return cb();
            if (r.selector instanceof RegExp && !a.methObj.method.match(r.selector)) return cb();
            if (r.selector instanceof Function && !r.selector.apply(a.self, [a.methObj.method, a.methObj.args])) return cb();

            r = r.handler;
          }

          return r.apply(a.self, [a.acObj, a.methObj, cb]);
        }, function(){
          if (arguments.length > 0) return a.o.cb ? a.o.cb.apply(null, arguments) : arguments;

          return a.self[a.methObj.method].apply ? a.self[a.methObj.method].apply(a.self, a.methObj.args)
                                                : a.self[a.methObj.method];
        });
      }
    };

    /*
      Synchronous version of rol
    */
    R['rolSync'] = function(acObj, method, args, options){
      var o = options || {};
      o.async = false;
      o.sync = true;

      return R.rol(acObj, method, args, o);
    };

    /*
      Asynchronous version of rol
    */
    R['rolAsync'] = function(acObj, method, args, options){
      var o = options || {};
      o.async = true;
      o.sync = false;

      return R.rol(acObj, method, args, o);
    };

    /*
      Add a rule to the rules array
    */
    R['addRule'] = function(rule, index){
      if (index === undefined){
        R.rules.push(rule);
      } else {
        R.rules.splice(index, 0, rule);
      }
      return R;
    };

    /*
      Remove a rule from the rules array
    */
    R['removeRule'] = function(label){
      if (typeof label === 'number'){
        R.rules.splice(label, 1);
      } else if (typeof label === 'string'){
        R.rules = R.rules.filter(function(r){
          return !r.label || r.label !== label;
        });
      } else if (label instanceof RegExp){
        R.rules = R.rules.filter(function(r){
          return !r.label || !r.label.match(label);
        });
      }
      return R;
    };

    /*
      Array of rules used for access control and mediation
    */
    R['rules'] = [];

    /*
      Execute functions in series, aborting when any arguments are passed to the callback
    */
    R['_asyncSeries'] = function(list, iter, cb, index){
      var self = this;

      if (!index) index = 0;

      if (index >= list.length) return cb();

      return iter(list[index], function(){
        if (arguments.length > 0) return cb.apply(self, arguments);

        return self._asyncSeries(list, iter, cb, index + 1);
      }, index);
    };

    /*
      Wrap an object with Rol - R becomes accessible from obj.rol
    */
    R['wrap'] = function(obj, options){
      var o = options || {};
      obj[o.prefix || 'rol'] = R.rol.bind(obj);
      obj[(o.prefix || 'rol') + 'Sync'] = R.rolSync.bind(obj);
      obj[(o.prefix || 'rol') + 'Async'] = R.rolAsync.bind(obj);
      obj['addRule'] = R.addRule;
      obj['removeRule'] = R.removeRule;
      obj['interface'] = R.interface;
      obj['_' + (o.prefix || 'rol')] = R;
      return this;
    };

    /*
      Create an interface object, where calls to its methods/properties are passed to an
      underlying rol-ed object
    */
    R['interface'] = function(iObj, rObj, options){
      var o = options || {'overwrite': false, 'prefix': 'rol'}
        , self = this;
      rObj = rObj || self;

      if (!o.keys) for (var k in rObj){
        if (!o.overwrite && iObj[k]) continue;
        if (k === o.prefix) continue;
        if (k === o.prefix + 'Sync') continue;
        if (k === o.prefix + 'Async') continue;
        if (k === '_' + o.prefix) continue;
        if (k === 'addRule') continue;
        if (k === 'removeRule') continue;
        if (k === 'interface') continue;

        iObj[k] = function(){
          return rObj.rol(this, k, arguments);
        };
      }

      if (o.keys) o.keys.forEach(function(k){
        return iObj[k] = function(){
          return rObj.rol(this, k, arguments);
        };
      });

      return iObj;
    };

    return R;
  };

  if (typeof module !== 'undefined'){ module.exports = Rol; } //server
  else { this.Rol = Rol; }

}).call(this);
