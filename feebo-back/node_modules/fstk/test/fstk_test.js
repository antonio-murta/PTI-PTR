'use strict';

var FSTK = require('../lib/fstk.js')
  , Belt = require('jsbelt')
  , FS = require('fs')
  , OS = require('os')
  , Path = require('path')
  , Async = require('async')
  , _ = require('underscore')
  , Child_Process = require('child_process')
;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var create_dummy_directory = function(dir){
  dir = _.defaults(dir || {}, {
    'contents': {}
  , 'directory_count': Belt.random_int(1, 2)
  , 'file_count': Belt.random_int(1, 2)
  , 'files': {}
  , 'directories': {}
  , 'path': Path.join(OS.tmpdir(), Belt.uuid())
  });

  var uuid;
  for (var i = 0; i < dir.directory_count; i++){
    uuid = Belt.uuid();
    FS.mkdirSync(Path.join(dir.path, uuid));
    dir.contents[uuid] = {
      'type': 'directory'
    , 'path': Path.join(dir.path, uuid)
    };
    dir.directories[uuid] = {
      'type': 'directory'
    , 'path': Path.join(dir.path, uuid)
    };
  }
  for (i = 0; i < dir.file_count; i++){
    uuid = Belt.uuid();
    FS.writeFileSync(Path.join(dir.path, uuid), 'test file');
    dir.contents[uuid] = {
      'type': 'file'
    , 'path': Path.join(dir.path, uuid)
    };
    dir.files[uuid] = {
      'type': 'file'
    , 'path': Path.join(dir.path, uuid)
    };
  }

  return dir;
};

var create_file_tree = function(){
  var tree = {
        'contents': {}
      , 'files': {}
      , 'directories': {}
      , 'path': Path.join(OS.tmpdir(), Belt.uuid())
      };
  FS.mkdirSync(tree.path);

  tree.contents = create_dummy_directory({'path': tree.path});
  tree.files = _.extend(tree.files, tree.contents.files);
  tree.directories = _.extend(tree.directories, tree.contents.directories);

  _.each(tree.contents.directories, function(d){
    d.subdir = create_dummy_directory({'path': d.path});
    tree.files = _.extend(tree.files, d.subdir.files);
    tree.directories = _.extend(tree.directories, d.subdir.directories);

    return _.each(d.subdir.directories, function(d2){
      d2.subdir = create_dummy_directory({'path': d2.path});
      tree.files = _.extend(tree.files, d2.subdir.files);
      tree.directories = _.extend(tree.directories, d2.subdir.directories);

      return _.each(d2.subdir.directories, function(d3){
        d3.subdir = create_dummy_directory({'path': d3.path});
        tree.files = _.extend(tree.files, d3.subdir.files);
        tree.directories = _.extend(tree.directories, d3.subdir.directories);

        return;
      });
    });
  });
  return tree;
};

exports['fstk'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'filename': function(test) {
    test.expect(1);

    test.ok(FSTK.filename('/path/file.foo') === 'file');

    test.done();
  },
  'replaceExt': function(test) {
    test.expect(1);

    test.ok(FSTK.replaceExt('/path/file.foo', 'bar') === '/path/file.bar');

    test.done();
  },
  'fileType': function(test) {
    test.expect(3);

    test.ok(FSTK.fileType('/path/file.mov') === 'video');
    test.ok(FSTK.fileType('/path/file.mp3') === 'audio');
    test.ok(FSTK.fileType('/path/file.png') === 'image');

    test.done();
  },
  'subPaths': function(test) {
    test.expect(2);

    test.ok(Belt.deepEqual(FSTK.subPaths('/path/to/file.foo'), ['/', '/path', '/path/to', '/path/to/file.foo']));
    test.ok(Belt.deepEqual(FSTK.subPaths('path/to/file.foo'), ['path', 'path/to', 'path/to/file.foo']));

    test.done();
  },
  'stat & exists': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        console.log('Creating temp files and directories');
        globals.directory = Path.join(OS.tmpdir(), '/' + Belt.uuid());
        globals.file = Path.join(OS.tmpdir(), '/' + Belt.uuid() + '.json');
        globals.link = Path.join(OS.tmpdir(), '/' + Belt.uuid() + '.link');

        FS.mkdirSync(globals.directory);
        FS.writeFileSync(globals.file, 'this is the test file');
        FS.symlinkSync(globals.file, globals.link);
        return cb();
      }
    , function(cb){
        return FSTK.stat(globals.directory, Belt.cs(cb, globals, 'directory_stat', 1, 0));
      }
    , function(cb){
        return FSTK.stat(globals.file, Belt.cs(cb, globals, 'file_stat', 1, 0));
      }
    , function(cb){
        return FSTK.stat(globals.link, Belt.cs(cb, globals, 'link_stat', 1, 0));
      }
    , function(cb){
        return FSTK.stat(globals.directory, {'fast_stat': true}, Belt.cs(cb, globals, 'fast_directory_stat', 1, 0));
      }
    , function(cb){
        return FSTK.stat(globals.file, {'fast_stat': true}, Belt.cs(cb, globals, 'fast_file_stat', 1, 0));
      }
    , function(cb){
        return FSTK.stat(globals.link, {'fast_stat': true}, Belt.cs(cb, globals, 'fast_link_stat', 1, 0));
      }
    , function(cb){
        test.ok(globals.directory_stat.isDirectory);
        test.ok(!globals.directory_stat.isFile);
        test.ok(!globals.directory_stat.isBlockDevice);
        test.ok(!globals.directory_stat.isCharacterDevice);
        test.ok(!globals.directory_stat.isFIFO);
        test.ok(!globals.directory_stat.isSocket);
        test.ok(!globals.directory_stat.isSymbolicLink);
        test.ok(!globals.directory_stat.mime);

        test.ok(!globals.file_stat.isDirectory);
        test.ok(globals.file_stat.isFile);
        test.ok(!globals.file_stat.isBlockDevice);
        test.ok(!globals.file_stat.isCharacterDevice);
        test.ok(!globals.file_stat.isFIFO);
        test.ok(!globals.file_stat.isSocket);
        test.ok(!globals.file_stat.isSymbolicLink);
        test.ok(globals.file_stat.mime === 'application/json');

        test.ok(!globals.link_stat.isDirectory);
        test.ok(!globals.link_stat.isFile);
        test.ok(!globals.link_stat.isBlockDevice);
        test.ok(!globals.link_stat.isCharacterDevice);
        test.ok(!globals.link_stat.isFIFO);
        test.ok(!globals.link_stat.isSocket);
        test.ok(globals.link_stat.isSymbolicLink);

        test.ok(globals.fast_directory_stat.isDirectory === true);
        test.ok(globals.fast_directory_stat.isFile === undefined);
        test.ok(globals.fast_directory_stat.isBlockDevice === undefined);
        test.ok(globals.fast_directory_stat.isCharacterDevice === undefined);
        test.ok(globals.fast_directory_stat.isFIFO === undefined);
        test.ok(globals.fast_directory_stat.isSocket === undefined);
        test.ok(globals.fast_directory_stat.isSymbolicLink === undefined);
        test.ok(!globals.fast_directory_stat.mime);

        test.ok(globals.fast_file_stat.isDirectory === false);
        test.ok(globals.fast_file_stat.isFile === undefined);
        test.ok(globals.fast_file_stat.isBlockDevice === undefined);
        test.ok(globals.fast_file_stat.isCharacterDevice === undefined);
        test.ok(globals.fast_file_stat.isFIFO === undefined);
        test.ok(globals.fast_file_stat.isSocket === undefined);
        test.ok(globals.fast_file_stat.isSymbolicLink === undefined);
        test.ok(!globals.fast_file_stat.mime);

        test.ok(globals.fast_link_stat.isDirectory === false);
        test.ok(globals.fast_link_stat.isFile === undefined);
        test.ok(globals.fast_link_stat.isBlockDevice === undefined);
        test.ok(globals.fast_link_stat.isCharacterDevice === undefined);
        test.ok(globals.fast_link_stat.isFIFO === undefined);
        test.ok(globals.fast_link_stat.isSocket === undefined);
        test.ok(globals.fast_link_stat.isSymbolicLink === undefined);
        test.ok(!globals.fast_link_stat.mime);

        return cb();
      }
    , function(cb){
        return FSTK.exists(globals.link, Belt.cs(cb, globals, 'exists_1', 0));
      }
    , function(cb){
        return FSTK.exists(globals.directory, Belt.cs(cb, globals, 'exists_2', 0));
      }
    , function(cb){
        return FSTK.exists(globals.file, Belt.cs(cb, globals, 'exists_3', 0));
      }
    , function(cb){
        return FSTK.exists('/a/completely/fake/path/to/nowhere.json', Belt.cs(cb, globals, 'exists_4', 0));
      }
    , function(cb){
        test.ok(globals.exists_1);
        test.ok(globals.exists_2);
        test.ok(globals.exists_3);
        test.ok(!globals.exists_4);

        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      FS.rmdirSync(globals.directory);
      FS.unlinkSync(globals.file);
      FS.unlinkSync(globals.link);

      test.done();
    });
  },
  'statDir': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        console.log('Creating nested temp directory');
        globals.directory = Path.join(OS.tmpdir(), '/' + Belt.uuid());

        FS.mkdirSync(globals.directory);

        globals.contents = Belt.sequence(Belt.uuid, 100);
        for (var i = 0; i < 50; i++){
          FS.writeFileSync(Path.join(globals.directory, globals.contents[i]), 'this is a file');
          globals.contents[i] = {'path': Path.join(globals.directory, globals.contents[i]), 'type': 'file'};
        }

        for (i = 50; i < 75; i++){
          FS.mkdirSync(Path.join(globals.directory, globals.contents[i]));
          globals.contents[i] = {'path': Path.join(globals.directory, globals.contents[i]), 'type': 'directory'};
        }

        for (i = 75; i < 100; i++){
          FS.symlinkSync( globals.contents[i - 50].path
                        , Path.join(globals.directory, globals.contents[i]));
          globals.contents[i] = { 'path': Path.join(globals.directory, globals.contents[i])
                                , 'realpath': globals.contents[i - 50].path
                                , 'type': 'link'};
        }
 
        return cb();
      }
    , function(cb){
        return FSTK.transformDir(globals.directory, function(p, _cb){ return _cb(null, 'hello'); }
               , Belt.cs(cb, globals, 'transformed_paths', 1, 0));
      }
    , function(cb){
        return FSTK.statDir(globals.directory, Belt.cs(cb, globals, 'stat_dir', 1, 0));
      }
    , function(cb){
        test.ok(Belt.deepEqual(Belt.sequence(function(){ return 'hello'; }, globals.contents.length), globals.transformed_paths));

        test.ok(globals.stat_dir.directory && globals.stat_dir.directory.realpath === globals.directory);
        test.ok(globals.stat_dir.directory.isDirectory);

        _.each(globals.contents, function(c){
          var file_stat = _.find(globals.stat_dir.files, function(f){
            return f.path === c.path;
          });

          test.ok(file_stat);
          if (c.type === 'link'){
            test.ok(file_stat.isSymbolicLink);
            test.ok(!file_stat.isDirectory);
          }
          if (c.type === 'directory'){
            test.ok(!file_stat.isSymbolicLink);
            test.ok(file_stat.isDirectory);
            test.ok(!file_stat.isFile);
          }
          if (c.type === 'file'){
            test.ok(!file_stat.isSymbolicLink);
            test.ok(!file_stat.isDirectory);
            test.ok(file_stat.isFile);
          }
        });

        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'transformFile': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), Belt.uuid());
        FS.writeFileSync(globals.path, 'this is a test file');
        return FSTK.transformFile(globals.path
               , function(b, _cb){ return _cb(null, 'transformed file'); }, Belt.cw(cb, 0)); 
      }
    , function(cb){
        var body = FS.readFileSync(globals.path);
        test.ok(body.toString() === 'transformed file');
        return cb();
      }
    , function(cb){
        globals.new_path = Path.join(OS.tmpdir(), Belt.uuid());
        return FSTK.transformFile(globals.path
               , function(b, _cb){ return _cb(null, 'new transformed file'); }
                 , {'destination': globals.new_path}, Belt.cw(cb)); 
      }
    , function(cb){
        var body = FS.readFileSync(globals.new_path);
        test.ok(body.toString() === 'new transformed file');
        body = FS.readFileSync(globals.path);
        test.ok(body.toString() === 'transformed file');
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'gzipFiles': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), Belt.uuid());
        return FSTK.writeGzipFile(globals.path, 'this is a test file', Belt.cw(cb, 0)); 
      }
    , function(cb){
        var body = FS.readFileSync(globals.path);
        test.ok(body.toString() !== 'this is a test file');
        return FSTK.readGzipFile(globals.path, Belt.cs(cb, globals, 'body', 1, 0)); 
      }
    , function(cb){
        test.ok(globals.body.toString() === 'this is a test file');
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'jsonFiles': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), Belt.uuid());
        globals.json = {'this': {'is': ['json', 1, 2, 3]}};
        return FSTK.writeJSON(globals.path, globals.json, Belt.cw(cb, 0)); 
      }
    , function(cb){
        var body = FS.readFileSync(globals.path);
        test.ok(body.toString() === JSON.stringify(globals.json, null, 2));
        return FSTK.readJSON(globals.path, Belt.cs(cb, globals, 'body', 1, 0)); 
      }
    , function(cb){
        test.ok(Belt.deepEqual(globals.json, globals.body));
        return cb();
      }
    , function(cb){
        return FSTK.updateJSON(globals.path, 'this.is', 'updated', Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.readJSON(globals.path, Belt.cs(cb, globals, 'body', 1, 0)); 
      }
    , function(cb){
        test.ok(globals.body.this.is === 'updated');
        return cb();
      }
    , function(cb){
        return FSTK.updateJSON(globals.path, function(){ this.this = 'updated_again'; return; }, Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.readJSON(globals.path, Belt.cs(cb, globals, 'body', 1, 0)); 
      }
    , function(cb){
        test.ok(globals.body.this === 'updated_again');
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);
      test.done();
    });
  },
  'mkdir & rmdir': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), '/path/deep/exists/not/yet');
        return FSTK.mkdir(globals.path, Belt.cw(cb, 0)); 
      }
    , function(cb){
        return FSTK.exists(globals.path, function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.exists(Path.join(OS.tmpdir(), '/path/deep/exists'), function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.exists(Path.join(OS.tmpdir(), '/path'), function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.rmdir(globals.path, Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.exists(globals.path, function(exists){
          test.ok(!exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.rmdir(globals.path, Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.rmdir(Path.join(OS.tmpdir(), '/path'), Belt.cw(cb, 0));
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'rm': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), '/random/path/to/' + Belt.uuid());
        globals.file_path = Path.join(globals.path, '/' + Belt.uuid());
        globals.file_path2 = Path.join(OS.tmpdir(), '/random', '/' + Belt.uuid());
        return FSTK.mkdir(globals.path, Belt.cw(cb, 0)); 
      }
    , function(cb){
        return FSTK.exists(globals.path, function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.exists(Path.join(OS.tmpdir(), '/random/path/to'), function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        FS.writeFileSync(globals.file_path, 'this is a test');
        FS.writeFileSync(globals.file_path2, 'this is a test');
        return cb();
      }
    , function(cb){
        return FSTK.exists(globals.file_path, function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.exists(globals.file_path2, function(exists){
          test.ok(exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.rm(globals.file_path2, Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.exists(globals.file_path2, function(exists){
          test.ok(!exists);
          return cb();
        });
      }
    , function(cb){
        return FSTK.rm(Path.join(OS.tmpdir(), '/random'), Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.exists(Path.join(OS.tmpdir(), '/random'), function(exists){
          test.ok(!exists);
          return cb();
        });
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'write files': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), '/' + Belt.uuid(), '/' + Belt.uuid(), '/' + Belt.uuid());
        return FSTK.writeFile(globals.path, 'this is a test', Belt.cw(cb, 0)); 
      }
    , function(cb){
        var body = FS.readFileSync(globals.path);
        test.ok(body.toString() === 'this is a test');
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'watch files': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), '/' + Belt.uuid(), '/' + Belt.uuid(), '/' + Belt.uuid());
        return FSTK.writeFile(globals.path, 'this is a test', Belt.cw(cb, 0)); 
      }
    , function(cb){
        return FSTK.watchFile(globals.path, Belt.cs(cb, globals, 'watch', 1, 0));
      }
    , function(cb){
        test.ok(globals.watch.file.toString() === 'this is a test');
        FS.writeFileSync(globals.path, 'now it is modified');
        return setTimeout(function(){ return globals.watch.get(Belt.cs(cb, globals, 'file', 0)); }, 1000);
      }
    , function(cb){
        test.ok(globals.file.toString() === 'now it is modified');
        return cb();
      }
    , function(cb){
        return globals.watch.set(new Buffer('modifying the file'), cb);
      }
    , function(cb){
        return globals.watch.get(Belt.cs(cb, globals, 'file', 0));
      }
    , function(cb){
        test.ok(globals.file.toString() === 'modifying the file');
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'watch json': function(test) {
    var globals = {};
    return Async.waterfall([
      function(cb){
        globals.path = Path.join(OS.tmpdir(), '/' + Belt.uuid(), '/' + Belt.uuid(), '/' + Belt.uuid());
        globals.json = {'this': {'is': ['the', 'json', 1, 2, 3]}};
        return FSTK.watchJSON(globals.path, {'data': globals.json}, Belt.cs(cb, globals, 'watch', 1, 0)); 
      }
    , function(cb){
        return globals.watch.get(Belt.cs(cb, globals, 'file', 0));
      }
    , function(cb){
        test.ok(Belt.deepEqual(globals.file, globals.json));
        return cb();
      }
    , function(cb){
        globals.new_json = {'this': {'be the': ['new']}};
        return globals.watch.set(globals.new_json, Belt.cs(cb, globals, 'file', 0));
      }
    , function(cb){
        return globals.watch.get(Belt.cs(cb, globals, 'file', 0));
      }
    , function(cb){
        test.ok(Belt.deepEqual(globals.file, globals.new_json));
        return cb();
      }
    , function(cb){
        globals.new_json = {'this': {'be the': 3}};
        return globals.watch.pset('this.be the', 3, Belt.cs(cb, globals, 'file', 0));
      }
    , function(cb){
        return globals.watch.get(Belt.cs(cb, globals, 'file', 0));
      }
    , function(cb){
        test.ok(Belt.deepEqual(globals.file, globals.new_json));
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'dirTree & dirPart': function(test) {
    var globals = {}
      , tree_level_test = function(tree_directory, dir_tree_directory){

        test.ok(_.keys(dir_tree_directory.files).length === _.keys(tree_directory.files).length);
        test.ok(_.keys(dir_tree_directory.directories).length === _.keys(tree_directory.directories).length);
        test.ok(!_.any(_.difference(_.pluck(_.values(dir_tree_directory.files), 'path'), _.pluck(_.values(tree_directory.files), 'path'))));
        test.ok(!_.any(_.difference(_.pluck(_.values(dir_tree_directory.directories), 'path'), _.pluck(_.values(tree_directory.directories), 'path'))));
        return _.each(dir_tree_directory.directories, function(d){
          return tree_level_test(_.find(tree_directory.directories, function(f){ return f.path === d.path; }), d);
        });
      };

    return Async.waterfall([
      function(cb){
        globals.tree = create_file_tree();
        return cb();
      }
    , function(cb){
        return FSTK.dirTree(globals.tree.path, Belt.cs(cb, globals, 'dirTree', 1, 0));
      }
    , function(cb){
        return FSTK.dirPart(globals.tree.path, Belt.cs(cb, globals, 'dirPart', 1, 0));
      }
    , function(cb){
        FS.writeFileSync(Path.join(OS.tmpdir(), '/tree.json'), JSON.stringify(globals.dirTree, null, 2));
        FS.writeFileSync(Path.join(OS.tmpdir(), '/part.json'), JSON.stringify(globals.dirPart, null, 2));
        tree_level_test(globals.tree.contents, globals.dirTree);
        return cb();
      }
    , function(cb){

        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  },
  'flattenDir & emptyDir': function(test) {
    var globals = {};

    return Async.waterfall([
      function(cb){
        globals.tree = create_file_tree();
        return cb();
      }
    , function(cb){
        return FSTK.statDir(globals.tree.path, Belt.cs(cb, globals, 'orig_stat', 1, 0));
      }
    , function(cb){
        return FSTK.flattenDir(globals.tree.path, Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.statDir(globals.tree.path, Belt.cs(cb, globals, 'stat', 1, 0));
      }
    , function(cb){
        return FSTK.dirPart(globals.tree.path, Belt.cs(cb, globals, 'part', 1, 0));
      }
    , function(cb){
        test.ok(globals.stat.files.length === _.keys(globals.tree.files).length);
        test.ok(globals.orig_stat.files.length !== _.keys(globals.tree.files).length);
        test.ok(!_.any(globals.part.directories));
        return cb();
      }
    , function(cb){
        globals.tree = create_file_tree();
        return cb();
      }
    , function(cb){
        return FSTK.dirPart(globals.tree.path, Belt.cs(cb, globals, 'orig_stat', 1, 0));
      }
    , function(cb){
        return FSTK.emptyDir(globals.tree.path, Belt.cw(cb, 0));
      }
    , function(cb){
        return FSTK.dirPart(globals.tree.path, Belt.cs(cb, globals, 'stat', 1, 0));
      }
    , function(cb){
        test.ok(globals.stat.directories.length === globals.orig_stat.directories.length);
        test.ok(globals.stat.files.length !== globals.orig_stat.files.length);
        test.ok(!_.any(globals.stat.files));
        return cb();
      }
    , function(cb){
        var files = [];
        for (var i = 0; i < 2000; i++){
          var path = FSTK.tempfile();
          test.ok(path);
          test.ok(!_.some(files, function(f){ return f === path; }));
          files.push(path);
        }
        return cb();
      }
    , function(cb){
        return FSTK.getURL('http://nytimes.com', Belt.cs(cb, globals, 'path', 1, 0));
      }
    , function(cb){
        globals.file = FS.readFileSync(globals.path).toString();
        test.ok(globals.file.match(/<\/html>/));
        test.ok(globals.file.match(/<html/));
        return cb();
      }
    , function(cb){
        return FSTK.getURL('http://i.imgur.com/IBPVml1.jpg', Belt.cs(cb, globals, 'path', 1, 0));
      }
    , function(cb){
        test.ok(FS.existsSync(globals.path));
        return cb();
      }
    , function(cb){
        globals.path = FSTK.tempfile();
        FS.writeFileSync(globals.path, 'This is a test file');
        globals.new_path = FSTK.tempfile();
        test.ok(FS.existsSync(globals.path));
        test.ok(!FS.existsSync(globals.new_path));

        return FSTK.mv(globals.path, globals.new_path, Belt.cw(cb, 0));
      }
    , function(cb){
        test.ok(!FS.existsSync(globals.path));
        test.ok(FS.existsSync(globals.new_path));
        return cb();
      }
    , function(cb){
        globals.path = FSTK.tempfile();
        globals.sub_path = Path.join(globals.path, '/asubpath.txt');
        globals.sub_path2 = Path.join(globals.path, '/subpath2');
        globals.sub_path3 = Path.join(globals.sub_path2, '/nested.txt');
        FS.mkdirSync(globals.path);
        FS.mkdirSync(globals.sub_path2);
        FS.writeFileSync(globals.sub_path, 'This is a test file');
        FS.writeFileSync(globals.sub_path3, 'This is a test file');
        globals.new_path = FSTK.tempfile();
        test.ok(FS.existsSync(globals.path));
        test.ok(FS.existsSync(globals.sub_path));
        test.ok(FS.existsSync(globals.sub_path2));
        test.ok(FS.existsSync(globals.sub_path3));
        test.ok(!FS.existsSync(globals.new_path));

        return FSTK.mv(globals.path, globals.new_path, Belt.cw(cb, 0));
      }
    , function(cb){
        test.ok(!FS.existsSync(globals.path));
        test.ok(!FS.existsSync(globals.sub_path));
        test.ok(!FS.existsSync(globals.sub_path2));
        test.ok(!FS.existsSync(globals.sub_path3));
        test.ok(FS.existsSync(globals.new_path));
        return cb();
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);

      test.done();
    });
  }
, 'safePath': function(test){
    var test_name = 'safePath';

    //log.debug(test_name);
    //log.profile(test_name);

    //Yessir.test = test;

    test.ok(FSTK.safePath('/') === false);
    test.ok(FSTK.safePath('/etc') === false);
    test.ok(FSTK.safePath('/some.json') === false);
    test.ok(FSTK.safePath('./'), Path.resolve('./'));
    test.ok(FSTK.safePath('.'), Path.resolve('.'));
    test.ok(FSTK.safePath('..'), Path.resolve('..'));
    test.ok(FSTK.safePath('') === false);
    test.ok(FSTK.safePath() === false);
    test.ok(FSTK.safePath(false) === false);
    test.ok(FSTK.safePath(null) === false);
    test.ok(FSTK.safePath('etc'));
    test.ok(FSTK.safePath('/etc/file'));

    //log.profile(test_name);
    return test.done();
  }
};
