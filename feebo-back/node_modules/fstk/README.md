# fstk

fstk is a [Node.js](http://nodejs.org) module for extending Node's FS module with various utility methods, without relying on child processes (i.e. bash).

## Getting Started
Install the module with: `npm install fstk`

```javascript
var fstk = require('fstk');
```

## Methods
All methods accept optional options object and callback as last two arguments (order doesn't matter). If options are not supplied, defaults are used. If callback is not supplied, noop is used.

* **tempfile()** - Returns a unique temporary file path, using the system's default temp directory
* **filename(path)** - Returns ``path``'s base filename with extension removed
* **replaceExt(path, extension)** - Replace ``path``'s current extension (if any) with ``extension``
* **fileType(path)** - Returns an intelligent guess of ``path``'s type based on extension (right now either ``video``, ``audio``, or ``image``). Mime type list is located in ``./resources/mimes.json``
* **subPaths(path)** - Returns all intermediate paths (parent directories) to ``path``
* **stat(path, options, callback)** - Performs a more comprehensive stat on ``path``. Includes automatic evaluation of Node's isFile, isDirectory, ... methods. Includes automatic mime lookup, path normalization, and check for symbolic link. Pass ``options.fast_stat`` to skip these enhancements.
* **exists(path, callback)** - Checks for ``path``'s existence and passes ``true`` or ``false`` to callback
* **transformDir(path, transformer, options, callback)** - Reads contents of directory at ``path``, performing ``transformer`` on all file paths found. ``transformer`` is passed a path and a callback to include an error (if it occurs) as first element and and transformed path as second argument. Uses ``async.mapSeries``.
* **statDir(path, callback)** - Perform ``stat`` on ``path`` and it's top-level contents, passing an error (if applicable) and an object to ``callback`` containing ``path``'s stat and ``path.files`` with an array of stat objects for contents.
* **dirTree(path, callback)** - Recursively read and stat ``path`` and its subdirectories, passing to ``callback`` an error (if applicable) and an object representing a tree-like structure of ``path``'s deep contents.
* **dirPart(path, callback)** - Partitions the deep contents of ``path`` into arrays of ``directories`` and ``files``. Passes to ``callback`` an error (if applicable) and the flattened arrays of ``path``'s contents (regardless of specific sub-level).
* **flattenDir(path, callback)** - Flattens the structure of ``path``, moving all files to the top level and deleting the now empty subdirectories. Name collisions will cause deeper paths to be overwritten with shallower paths with the same filename.
* **emptyDir(path, callback)** - Deletes files on all levels of ``path``, leaving the now empty subdirectories in their original structure.
* **writeFile(path, body, options, callback)** - Identical to Node's ``fs.writeFile`` but also creates any parent directories that do not exist, similar to bash's ``mkdir -p``
* **transformFile(path, transformer, options, callback)** - Reads in ``path``'s data, passes it to ``transformer``, which passes an error (if it occurs) and the transformed contents of ``path`` which are then used to overwrite ``path``. Pass ``options.destination`` to write the transformed data somewhere other than ``path``
* **writeGzipFile(path, body, options, callback)** - Compress ``data`` (gzip) and write the compressed version to ``path``, include ``options.encoding`` to use encoding other than ``utf8``
* **readGzipFile(path, options, callback)** - Read a compressed file at ``path``, decompressing it, and passing the resulting buffer to ``callback`` with an error (if it occured)
* **writeJSON(path, obj, callback)** - Stringify ``obj`` and write it to ``path``
* **readJSON(path, callback)** - Parse the contents of ``path`` and pass results to ``callback`` as an ``object``
* **updateJSON(path, update, [value], callback)** - Update the contents of JSON at ``path``, setting property ``update`` to ``value``, or calling ``update`` with JSON set as ``this``
* **mkdir(path, callback)** - Similar to bash's ``mkdir -p``, makes any missing parent paths for ``path`` before making ``path``
* **rmdir(path, callback)** - Similar to bash's ``rm -rf path``, removes empty and non-empty directories, while also deleting any of their contents
* **rm(path, callback)** - Similar to bash's ``rm -rf``, removes ``path`` even if it is a directory (empty or non-empty)
* **watchFile(path, options, callback)** - Poor man's database -- watches a file, loading its updated contents into memory when changes occur and persisting changes to the loaded version to disk. Passing ``options.serializer(data, cb)`` and ``options.deserializer(data, cb)`` provides asynchronous methods used to serialize data (when persisting to disk) and deserialize data (when loading from disk). ``callback`` is passed an ``object`` to ``callback`` with the following methods and properties:
    * **watcher** - Underlying ``FS.fileWatcher`` instance
    * **get(callback)** - Passes latest file data to ``callback``. If a disk read is in progress, callback is blocked until read is completed
    * **set(data, callback)** - Sets file data to ``data`` and persists to disk, calling ``callback`` when complete
    * **pset(pStr, value, callback)** - Sets a deep property (``pStr``) of file data to ``value`` and persists all data to disk, calling ``callback`` when complete
* **watchDirectory(path, options, callback)** - watch a directory of files, passing to callback an object including `files`, an object of watched files
* **watchJSON(path, options, callback)** - Uses ``watchFile`` with JSON serializers and deserializers to keep a JSON file actively updated in memory as an ``object``
* **watchDirectoryJSON(path, options, callback)** - watch a directory of JSON files, passing to callback an object including `files`, an object of watched JSON files
* **getURL(url, options, callback)** - Saves contents of `url` to a temporary file. Pass `options.dest_path` to specify a destination path. `callback` is passed an `error` and `path` for the newly created file
* **postPath(path, url, options, callback)** - Post the contents of `path` to `url`. Pass `options.method` as `post` or `put` to change request type. Pass `options.form_field` to specify a form field to post file contents to. Pass `options.form_data` to include other form data in the request.

## License
Copyright (c) 2014 Ben Sack
Licensed under the MIT license.
