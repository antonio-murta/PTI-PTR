# rol [![Build Status](https://secure.travis-ci.org/sackio/rol.png?branch=master)](http://travis-ci.org/sackio/rol)

Simple, powerful, and extendable access control and mediation in Node and the browser (with no dependencies). Use it to drop in access control rules, scopes, and interceptors to your Javascript objects. Includes templates to extend rol with common access design patterns.

Rol works by wrapping an object with methods for controlling access to the object's methods and properties

A `Rol` object includes `rules`, an array of methods that are called to mediate access to the wrapped object. Rules are applied in series, using an optional selector to apply the rule selectively. Rules include handlers which can mediate, redirect, or prevent access to the underlying object's method/property.

Rule handlers are passed an access object, which represents the access level to use during rule evaluation. Handlers are also passed the method object, which contains the method name and arguments, all of which can be mutated by any handler -- providing an interface for mediated object access. 

Rule handlers ultimately return a value (if synchronous) or pass a result to a callback. If handlers return or pass any arguments, the access attempt is aborted and these arguments are returned to the original caller or passed to the original callback -- providing powerful and granular access control.

## Getting Started
In Node, install the module with: `npm install rol`

```javascript
var Rol = require('rol');
```

In the browser, install the module with: `bower install rol`

```javascript
window.Rol || Rol; //global
```

## Examples

An object is wrapped with `Rol.wrap(obj)`

The object then includes a `rol` method for mediating access.

```javascript
//some examples

//an unmediated object
var obj = {
  'method': function(name){ return console.log('Hi, ' + name); }
, 'prop': 'I am a property value'
};

obj.method('Pablo'); //prints 'Hi, Pablo'
console.log(obj.prop); //prints 'I am a property value'

//wrapping object
Rol.wrap(obj);

obj.rol //rol instance for object, references Rol

//adding some access rules

//rule prevents method from being called if name is Pablo
obj.rol.addRule({
  'label': 'No Pablos allowed' //optional name for rule
, 'selector': /method/i //optional selector to determine if rule is applied
, 'handler': function(acObj, methObj){
    if (acObj.name.match(/pablo/i)) return new Error('No Pablos allowed');
    if (methObj.args[0].match(/pablo/i)) return new Error('Nice try, Pablo');

    return;
  }
});

obj.rol({'name': 'Pablo Picasso'}, 'method', 'Picasso'); //returns an Error ('No Pablos allowed')
obj.rol('method', 'Picasso'); //returns 'Hi, Picasso'
obj.rol('method', 'Pablo'); //returns an Error ('Nice try, Pablo')

//rule prevents access to prop if access object is a spy
obj.rol.addRule({
  'label': 'No spies'
, 'selector': /prop/i
, 'handler': function(acObj, methObj){
    if(acObj.role === 'spy') return 'Unauthorized';

    return this[methObj.method];
  }
});

obj.rol(null, 'prop'); //returns 'I am a property value'
obj.rol({'role': 'spy'}, 'prop'); //returns 'Unauthorized'

//works with asynchronous methods

obj.asyncMethod = function(name, cb){
  return cb(name);
}

obj.rol.addRule({
  'label': 'Skip wait'
, 'selector': /method/i
, 'handler': function(acObj, methObj, cb){
    if(!acObj.speed === 'slow') return cb();

    return setTimeout(cb, 5000);
  }
});

obj.rol(null, 'method', ['Henri', console.log]); //logs 'Henri' right away
obj.rol({'speed': 'slow'}, 'method', ['Henri', console.log]); //logs 'Henri' after five seconds

```

## Usage

### Rules

Rol uses a `rules` property as an array of the rules conditionally applied when the `rol` method is applied. Rules are applied in series, so their index ordering has an effect on the order/priority of rules.

Each element of the `rules` array can be either a `function` or `object`. If a `function`, the element is a handler which will be applied to all `rol` calls regardless of the arguments passed (i.e. a global access policy on the object).

**Example: global rule**
```javascript

/*
  This handler will be applied to all calls of obj.rol
*/
obj.rol.addRule(function(acObj, methObj, cb){
  if (acObj.role === 'villain') return cb(new Error('No villains allowed'));

  return cb();
});

```

In the above example, a function is added to the rules array. When `obj.rol` is called, this handler is applied with the following arguments:
  * **acObj** - the access object represents the state being used to evaluate the access level for this call (i.e. it could contain the role of a user trying to access the object). It can be anything (including `null`). The access object is passed as the first argument to `rol.obj` and is then passed to each rule handler for the call.
  * **methObj** - the method object encapsulates information on the method that would have been called on the original object, and is now being mediated by `rol`. It consists of `methObj.method` - the name of the method, and `methObj.args` - an array of arguments to be passed to the method. These two keys are the second and third arguments of a call to `rol.obj` (i.e. a mediated call by an admin to `obj.say('hi', user.name)` might look like `obj.rol(user, 'say', ['hi'])`). The `methObj` is passed to all rule handlers as the second argument.
  * **cb** - a callback is passed by default to all handlers (unless the `rolSync` method is called). The callback is passed optional arguments, which will cause the `obj.rol` method to short circuit, skipping any additional rules and not calling the underlying object method. `obj.rol` will attempt to apply these arguments to a callback included in the arguments array (i.e. pass an error to the callback that would have been sent to the unmediated method, had it not been short circuited).
  * **this** - each handler is bound to the original object (i.e. `obj`)

Rules can be made more selective and conditional by adding an object to the rules array.

**Example: conditional rule**
```javascript

/*
  This selector will be applied to any methods with a name matching 'locations'
*/
obj.rol.addRule({
  'label': 'scope by state'
, 'selector': /locations/i
, 'handler': function(acObj, methObj){
    if (!acObj || !acObj.state) return;

    var locations = this.locations
      , state_locations = [];

    locations.forEach(function(l){
      if (l.state == acObj.state) state_locations.push(l);
      return;
    });

    return state_locations;
  }
});

```

The above example demonstrates a rule that is only called when the method name matches the regular expression `/locations/i` (i.e. `obj.rol({}, 'locations')`). Since `rol` is being used with a property, the handler is treated as a synchronous function. If it returns a value other than `null` or `undefined`, the call to `obj.rol` is short circuited, with the result of the handler being returned to the original caller. If it returns `undefined` or `null`, the `obj.rol` call continues. An optional label describes the rule. The handler would be called for matching methods. If the access object does not include the state, the `obj.rol` call continues, in this case returning the unfiltered value of the `obj.locations` property (assuming there are no additional rules to apply). If the access object includes a `state`, the `obj.locations` property is filtered to only include locations matching the user's state. Thus, this rule acts as an interceptor to scope the returned locations by a relevant state.

#### Rule selectors
Rule selectors can be a `String`, `Regular Expression`, or `Function`. If a selector is a string, its handler will only be triggered if the method name equals the selector string. If selector is a regular expression, its handler will be triggered if the method name matches. Selector can be a function with the signature `selector(method_name, arguments_array)`. If the selector function returns `true`, its handler is triggered. If the selector is falsey, the handler is applied to all methods.

### Sync vs. Async

Rol can handle both synchronous and asynchronous methods. By default, Rol will operate synchronously, with the chain of rule evaluations ending once any rule returns a value other than `undefined` or `null`. If no rule returns a value, the original method is called with the (now likely mutated) arguments. The result is returned. If called on a non-callable property, Rol will only behave synchronously.

If `rol` is called with a function as the last argument in the argument array (i.e. `obj.rol({}, 'wait', [1, function(){ console.log('done'); }])`), this argument is treated as a callback, and causes Rol to behave asynchronously. Each rule is called in series, with a callback being used to move to the next rule. If any rule's callback passes arguments, the evaluation chain is halted, and the passed arguments are sent to the original callback.

Rol can be forced to behave asynchronously with the method `rolSync`. Equally, Rol can be forced to behave asynchronously with `rolAsync`.

### Methods & Properties

* **obj.rol(acObj, method, args, options)** - Evaluates applicable rules, eventually calling `obj[method].apply(obj, args)` -- though any of these arguments could have been mutated during the rule evaluation chain. Passing `options.sync` forces evaulation to behave synchronously. Passing `options.async` forces evaluation to behave asynchronously through callbacks.
* **obj.rolSync(acObj, method, args, options)** - Synchronous evaulation of `rol`
* **obj.rolAsync(acObj, method, args, options)** - Asynchronous evaulation of `rol`
* **Rol.wrap(obj, options)** - Bind this instance of `Rol` to `obj`, exposing Rol through `obj.rol`. Passing `options.prefix` can specify a method name other than `obj.rol`
* **Rol.rules** - Array of rules applied when `obj.rol` is called
* **Rol.addRule(rule, index)** - adds rule to Rol instance. Optional index can be included (otherwise rule is added as lowest priority). Rule can be a function or object (see above)
* **Rol.removeRule(label|index)** - removes any rule matching `label` (as string or regular expression), or removes rule at index if argument is numeric
* **Rol.interface(iObj, rObj, options)** - uses `iObj` to interface with the `rol` version of `rObj`. Each property of `iObj` (not previously defined) is defined to call the same property on `rObj` using `rol`. Binding an `iObj` method will use `this` as the access object.

## License
Copyright (c) 2014 Ben Sack
Licensed under the MIT license.
