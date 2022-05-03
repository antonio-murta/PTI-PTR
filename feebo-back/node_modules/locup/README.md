# locup

locup is a [Node.js](http://nodejs.org) module for simple geocoding. Use it to get the coordinates for addresses and to get addresses for coordinates.

Currently, locup uses Google's geocoding API, but it's ready to be extended to multiple providers.

## Getting Started
Install the module with: `npm install locup`

Provide you API credentials as an environmental variable `api_key`

```javascript
var Locup = new require('locup')({api_key: "YOUR KEY"});

Locup.get_address(lat, long, function(err, address){
  console.log(address);
  return;
});
```

## Methods
All methods accept optional options object and callback as last two arguments (order doesn't matter). If options are not supplied, defaults are used. If callback is not supplied, noop is used.

### Geocoding
Pass an address, get coordinates back

* **geocode(address, callback)** - Pass a geocoding object to callback
* **get_coordinates(address, callback)** - Pass an object to callback with ``lat`` and ``long``
* **get_bounds(address, callback)** - Pass bounds of a location to callback
* **get_formatted_address(address, callback)** - Pass human-readable, normalized address to callback
* **get_components(address, callback)** - Pass object of address components to callback

### Geocoding
Pass lat and long, get address back

* **reverse_geocode(lat, long, callback)** - Pass a geocoding object to callback
* **get_address(lat, long, callback)** - Pass a human-readable, normalized address to callback
* **get_address_components(lat, long, callback)** - Pass object of address components to callback

### References
* **location_types** - the types of locations available
* **result_types** - types of address components available

## License
Copyright (c) 2014 Ben Sack
Licensed under the MIT license.
