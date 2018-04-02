import mongoose  from "mongoose";
import { Router } from "express";
import bodyPaser from "body-parser";
var aws = require('aws-sdk');
var express = require('express');
var multer = require('multer');
var multerS3 = require('multer-s3');


export default ({config, db}) => {
  let api = Router();
  const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
  const s3 = new aws.S3({
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
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  }).single('file');


  api.post('/upload', (request, response) => {
    upload(request, response, function (error) {
      if (error) {
        console.log(error);
      }

      console.log("file"+request.file.location);
      response.json({
        fileUrl: request.file.location,
        message: 'File uploaded successfully.'});
      })
    });
    return api;
  }
