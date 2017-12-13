/*
 * These integration tests compile all cases from the example folder
 * and matches them against their dist folder
 */

 /* eslint-env jasmine */
'use strict';

// Workaround for css-loader issue
// https://github.com/webpack/css-loader/issues/144
if (!global.Promise) {
  require('es6-promise').polyfill();
}

var path = require('path');
var webpack = require('webpack');
var rimraf = require('rimraf');
var replaceInFile = require('replace-in-file');
var fs = require('fs');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];

var OUTPUT_DIR = path.join(__dirname, '../dist');

jasmine.getEnv().defaultTimeoutInterval = 30000;

function runExample (exampleName, done) {
  var examplePath = path.resolve(__dirname, '..', 'examples', exampleName);
  var exampleOutput = path.join(OUTPUT_DIR, exampleName);
  var fixturePath = path.join(examplePath, 'dist', 'webpack-' + webpackMajorVersion);
  // Clear old results
  rimraf(exampleOutput, function () {
    var options = require(path.join(examplePath, 'webpack.config.js'));
    options.context = examplePath;
    options.output.path = exampleOutput;
    if (Number(webpackMajorVersion) >= 4) {
      options.plugins.unshift(new webpack.LoaderOptionsPlugin({
        options: {
          context: process.cwd() // or the same value as `context`
        }
      }));
      if (options.module && options.module.loaders) {
        options.module.rules = options.module.loaders;
        delete options.module.loaders;
      }
      // TODO should we test both modes?
      options.mode = 'production';
    }

    webpack(options, function (err) {
      // Some generated webpack comments include absolute paths which will always
      // be different on different machines. We want to strip out those paths so
      // that tests can run anywhere
      if (Number(webpackMajorVersion) >= 4) {
        replaceInFile.sync({
          files: path.join(exampleOutput, '**'),
          from: RegExp(path.resolve(__dirname, '..') + '/', 'g'),
          to: '/__REPO_PATH__/'
        });
      }

      var dircompare = require('dir-compare');
      var res = dircompare.compareSync(fixturePath, exampleOutput, {compareSize: true});

      res.diffSet.filter(function (diff) {
        return diff.state === 'distinct';
      }).forEach(function (diff) {
        var file1Contents = fs.readFileSync(path.join(diff.path1, diff.name1)).toString();
        var file2Contents = fs.readFileSync(path.join(diff.path2, diff.name2)).toString();
        expect(file1Contents).diffPatch(file2Contents);
        expect(file1Contents).toBe(file2Contents);
      });

      expect(err).toBeFalsy();
      expect(res.same).toBe(true);
      done();
    });
  });
}

describe('HtmlWebpackPlugin Examples', function () {
  beforeEach(function () {
    jasmine.addMatchers(require('jasmine-diff-matchers').diffPatch);
  });

  it('appcache example', function (done) {
    runExample('appcache', done);
  });

  it('custom-template example', function (done) {
    runExample('custom-template', done);
  });

  it('default example', function (done) {
    runExample('default', done);
  });

  it('favicon example', function (done) {
    runExample('favicon', done);
  });

  it('html-loader example', function (done) {
    runExample('html-loader', done);
  });

  it('inline example', function (done) {
    runExample('inline', done);
  });

  it('jade-loader example', function (done) {
    runExample('jade-loader', done);
  });

  it('javascript example', function (done) {
    runExample('javascript', done);
  });

  it('javascript-advanced example', function (done) {
    runExample('javascript-advanced', done);
  });

  it('sort manually example', function (done) {
    runExample('sort-manually', done);
  });
});
