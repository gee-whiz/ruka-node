"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aws = require('aws-sdk');
var express = require('express');
var multer = require('multer');
var multerS3 = require('multer-s3');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();
  var spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
  var s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: '5ROOGB5NZBTM6CVLF6TZ',
    secretAccessKey: 'L+gqMlcp0DGa0uKeBvh5FxPoagkRmDrc+4RjVEl6aEs'
  });

  var upload = multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: 'ruka-storage',
      metadata: function metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function key(req, file, cb) {
        cb(null, Date.now().toString());
      }
    })
  }).single('file');

  api.post('/upload', function (request, response) {
    upload(request, response, function (error) {
      if (error) {
        console.log(error);
      }

      console.log("file" + request.file.location);
      response.json({
        fileUrl: request.file.location,
        message: 'File uploaded successfully.' });
    });
  });
  return api;
};
//# sourceMappingURL=server.js.map