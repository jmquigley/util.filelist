# util.filelist

> Reads a file list and returns it as an array of values.

[![build](https://circleci.com/gh/jmquigley/util.filelist/tree/master.svg?style=shield)](https://circleci.com/gh/jmquigley/util.filelist/tree/master)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.filelist.svg)](https://www.npmjs.com/package/util.filelist)
[![coverage](https://coveralls.io/repos/github/jmquigley/util.filelist/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.filelist?branch=master)

Reads a given file list, stores each line in an array, and returns the array.  It ignore blank lines and comments (`#` character).  Each line is delimited by the newline characters.

## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as a development dependency with cli:
```
$ yarn add --dev util.filelist
```

To build the app and run all tests:
```
$ yarn run all
```

## Example Usage
```
const getFileList = require('util.filelist');
lines = getFileList("file.list");

lines.forEach(function(line) {
    console.log(line);
});
```

An example of the `file.list` above would be:
```
# This is a comment

    line 1

 line 2

```
This would result in an Array with only two lines (line 1 & line 2).  The comment line and the blank line are removed and are not placed in the list.  It also trims leading and trailing spaces.
