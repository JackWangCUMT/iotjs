/* Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /*
   @STDOUT=FILE[../resources/test1.txt]
 */


var fs = require('fs');
var assert = require('assert');


var srcFilePath = "../resources/test1.txt";
var dstFilePath = "../tmp/test_fs2.txt";

var data;

function onWrite(err, written, buffer) {
  if (err) {
    throw err;
  } else {
    var fd = fs.openSync(dstFilePath, 'r');
    var buffer = new Buffer(128);
    var r_bytes = fs.readSync(fd, buffer, 0, buffer.length, 0);
    console.log(buffer.toString('utf8', 0, r_bytes));
  }
}

function onOpenForWrite(err, fd) {
  if (err) {
    throw err;
  } else {
    fs.write(fd, data, 0, data.length, onWrite);
  }
}

function onRead(err, bytesRead, buffer) {
  if (err) {
    throw err;
  } else {
    data = new Buffer(buffer.toString('utf8', 0, bytesRead));
    fs.open(dstFilePath, 'w', onOpenForWrite);
  }
}

function onOpenForRead(err, fd) {
  if (err) {
    throw err;
  } else {
    var buffer = new Buffer(128);
    fs.read(fd, buffer, 0, buffer.length, 0, onRead);
  }
}

fs.open(srcFilePath, 'r', onOpenForRead);
