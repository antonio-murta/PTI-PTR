# jsBelt [![Build Status](https://secure.travis-ci.org/sackio/jsbelt.png?branch=master)](http://travis-ci.org/sackio/jsbelt)

jsBelt is a Javascript module of convenience and utility methods for [Node.js](http://nodejs.org) and the browser. Inspired by [Underscore](http://underscorejs.org) and [Async](https://github/caolan/async), jsBelt provides functions for more concise and robust code, without changing or extending native objects and methods.

Functions include utilities for working with asynchronous callbacks, deep objects, method chaining, strings, random values, and function parameters.

## Getting Started
Install the module for Node with: `npm install jsbelt`

```javascript
var Belt = require('jsbelt');
```
Install the module with Bower for the browser: `bower install jsbelt`

```html
<script src="jsbelt/lib/jsbelt.js"></script>
<script type="text/javascript">

  alert(Belt.uuid());

</script>
```

## Methods

### Variadic Functions

* [`argulint`](#argulint) - get a handle on variable arguments, options, and callbacks

### Functions & Callbacks

* [`np`](#noop) - nothing to see here
* [`cl`](#callog) - log any arguments to console
* [`cw`](#callwrap) - wrap function so that only one argument (usually an error) gets applied
* [`cs`](#callset) - wrap function so that a passed object/key is set to one argument before function is applied
* [`dcs`](#deepcallset) - wrap function so that a passed object/key is set to one argument's deep property before function is applied
* [`dcds`](#) - wrap function so that a passed object/deep property is set to one argument's deep property before function is applied

### Deep Objects

* [`copy`](#copy) - fast deep object copying
* [`extend`](#extend) - similar to Underscore's method (didn't want to make Underscore a dependency)
* [`defObj`](#defObj) - create an object of specified keys with each key set to a default value
* [`deepObj`](#) - create an object from arrays (or an object) of deep properties and their values.
* [`deepEqual`](#deepEqual) - fast deep equality checking
* [`_get`](#_get) - get a deep property for an object, if it exists
* [`_set`](#_set) - set a deep property for an object, creating nested objects as necessary
* [`deepDefault`](#deepDefault) - set a deep property only if it is not already defined
* [`_call`](#_call) - call a deep method on an object, if it exists and is callable
* [`_chain`](#_chain) - chain a series of deep calls
* [`_find`](#_find) - find a deep property for an object with case / nesting-level insensitivity

### Arrays

* [`sequence`](#sequence) - create an array based on an iterator and iteration count
* [`defArray`](#defArray) - create an array of a default value for each element
* [`toArray`](#toArray) - wrap non-array in an array, keep arrays unchanged
* `deArray(obj)` - return only element of a single element array, or keep as array if more than one element
* [`splitArray`](#splitArray) - split array into subsets of a certain length, including any remainder
* `deepPluck(array, prop_string)` - pluck a deep property from each element in an array

### Randomness

* [`random_int`](#random_int) - return a random int between min (inclusive) and max (exclusive)
* [`random_bool`](#random_bool) - a coinflip
* [`random_els`](#random_int) - return random elements from an array (without replacement)
* [`random_string`](#random_string) - return a random string (optionally from a set of characters)

### Strings

* [`sanitize`](#sanitize) - convert any non-alphanumeric characters to a single space, lowercasing the result
* [`alpha_match`](#defObj) - returns a regular expression that matches on the same alphanumeric characters (case-insensitive) regardless of non-alphanumerics
* `capitalize(str)` - capitalize each word in a string
* `isValidJSON(str)` - returns true if `str` is valid JSON
* `parseJSON(str)` - returns JSON or an error if JSON was invalid

### TBD

* [`uuid`](#uuid) - generate a universally unique identifier
* [`fix_precision`](#fix_precision) - remove precision errors from floats


---------------------------------------

<a name="argulint" />
### argulint(args, options)

Lint arguments
  Takes native arguments object and optional options object.
  Returns an object of arguments with names. Useful for handling optional
  arguments, validations, and boilerplate (options, callback)
  * Last function is treated as 'callback'. If not found, noop is used.
  * Last object is treated as 'options'. If not found, empty object is used.
  i.e. returns {'options': <last argument that was an object>, 'callback': <last argument that was a function>}
  Options:
   * no_callback: do not define a callback
   * callback: use as the callback
   * no_options: do not define options
   * options: use as options
   * no_clone_options: do not make a deep copy of the options object
   * defaults: object of default values for linted arguments, which are overridden if defined elsewhere.
   * templates: object of functions for defining arguments. Keys are argument names. Values are integers of argument indexes or functions that get passed the arguments and options parameters passed initially, bound to an in-progress object of linted arguments. Template functions override other definitions. Templates are called after defaults are populated.
   * validators: object of functions (or objects) (or arrays of functions or objects) that are run to validate linted arguments. If value is a function, function is bound to the specified key in the linted arguments and passed the linted arguments object, the original arguments object, and original options object. If validator returns false, an error is thrown. If value is an object, 'validator' key must be a function as described, 'error' is a key with the error object to be thrown if validator returns false. Validators are run AFTER defaults are populated.

---------------------------------------

<a name="noop" />
### np()

A noop function

---------------------------------------

<a name="callwrap" />
### cw(func, index, thisObj)

Wrapped callback -returns a wrapped function which will only call argument(s) at specified index (indices). Defaults to calling no arguments index can be an integer or array of integers to apply multiple arguments to wrapped function. thisObj is an optional object to bind to wrapped function

Useful for async flows where the arguments passed to a callback are unimportant

---------------------------------------

<a name="callset" />
### cs(func, obj, key, set_index, call_index, thisObj)

Returns a wrapped function which sets a property in an object to an argument
index in a callback, then calls a wrapped version of the original callback
  Useful for async flows where it's helpful to capture the result of a callback
  in a global and move to the next step
  func - the function to be wrapped
  obj - the object whose property to set
  key - the property key to set
  set_index - the index of the argument to set to the property (default: 1)
  call_index - the index (or indices) of the argument to pass to the wrapped
    function (default: undefined)
  thisObj - optional object to bind wrapped function to

---------------------------------------

<a name="deepcallset" />
### dcs(func, obj, key, set_index, pStr, call_index, options)

Returns a wrapped function which sets a property in an object to the deep property of an argument
index in a callback, then calls a wrapped version of the original callback
  Useful for async flows where it's helpful to capture the result of a callback (as a deep property of one of the arguments)
  in a global and move to the next step
  func - the function to be wrapped
  obj - the object whose property to set
  key - the property key to set
  set_index - the index of the argument to set to the property (default: 1)
  pStr - the deep property string of the selected argument
  call_index - the index (or indices) of the argument to pass to the wrapped
    function (default: undefined)
  options - optional options object
    thisObj - optional object to bind wrapped function to
    err_on_miss - if deep property of argument is undefined, pass an error to the callback as first error

---------------------------------------

<a name="copy" />
### copy(obj, shallow_copy)

Copy/clone an object or array - pass true as second argument make a shallow copy, otherwise defaults to a deep copy

---------------------------------------

<a name="extend" />
### extend(obj, extender_objs)

Extend an object with another object.
  Shared keys will be overwritten with each iteration of extension
  extender can be a single object or an array of objects, which will be used
  to extend obj in sequence

  credit: underscore + jquery

---------------------------------------

<a name="deepEqual" />
### deepEqual(obj, obj2)

Quick deep-equality checker

---------------------------------------

<a name="_get" />
### _get(obj, pStr)

Get deep properties of an object if they exist, returning undefined if they don't.
  Takes object to be inspected as first argument and string of period-delimeted properties 
  as second argument. (i.e. deepProp(someobj, 'foo.bar.baz.0.whoop.whoop'))
  String begins with first level of properties. No need for an initial period.
  Numeric indexes can be included in property string for arrays.

---------------------------------------

<a name="_set" />
### _set(obj, pStr, value)

Set deep properties
  If properties or parent objects are not defined, create objects until
  reaching desired depth and then set property
  Takes object to be set upon as first argument, string of period-delimeted 
  properties as second argument, and value to be set as third argument
  String begins with first level of properties. No need for an initial period
  , and no need for a trailing period
  Blank property string sets obj to val. If obj is undefined, it is defined as
  and object
  Returns obj with property set

---------------------------------------

<a name="deepDefault" />
### deepDefault(obj, pStr, def)

If a deep property is undefined, set it to the given default

---------------------------------------

<a name="_call" />
### _call(obj, pStr, [args...])

Call a deep property that is a function if it exists, applying arguments
  if property is undefined or not callable, return undefined
  first argument is the object to be inspected (and serves as object binding for function)
  second argument is a property string to call
  subsequent arguments are applied to called function

---------------------------------------

<a name="_chain" />
### _chain(obj, [pStr, [args...]], [pstr, [args...]...])

Make deep calls in series, each argument after obj is an array of arguments for each successive deep call
If value becomes undefined, chain is exited

---------------------------------------

<a name="_find" />
### _find(obj, pStr)

Flexible keyspacing for deep objects - attempt to find a deep property
If not found, attempt to find an alternated deep property path that alphanumerically matches the property string
i.e. 'some.deep.property' would match 'somedeep.property' or 'som.edee.pprop.ert.y'

---------------------------------------

More documentation to come, see comments in **./lib/jsbelt.js**

---------------------------------------

## License
Copyright (c) 2014 Ben Sack  
Licensed under the MIT license.
