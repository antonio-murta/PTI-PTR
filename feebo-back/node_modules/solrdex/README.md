# solrdex

Use Solr as a secondary index and search engine. This module is a quick, no-frills way to get data into Solr for full-text searching and other features where Solr provides a useful boost over SQL and noSQL databases alone.

## Getting Started
Install the module with: `npm install solrdex`

```javascript
var Solrdex = new require('solrdex')(options);

Solrdex.add(docs, options, callback); //accepts individual documents or array
Solrdex.getByIds(ids, options, callback); //accepts individual ids or array
Solrdex.delete(ids, options, callback); //accepts individual ids or array
Solrdex.textSearch(query, {qf: fields}, callback); //accepts array or object for fields, along with other edismax options

```

## License
Copyright (c) 2014 Ben Sack
Licensed under the MIT license.
