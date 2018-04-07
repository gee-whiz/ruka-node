"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _user = require("../model/user");

var _user2 = _interopRequireDefault(_user);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _review = require("../model/review");

var _review2 = _interopRequireDefault(_review);

var _authMiddleware = require("../middleware/authMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //add v1 routers
  api.post('/add', _authMiddleware.authenticate, function (req, res) {
    var newUser = new _user2.default();

    newUser.email = req.body.email;
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.about = req.body.about;
    newUser.phone = req.body.phone;
    newUser.verified = req.body.verified;
    newUser.profile_image_uri = req.body.profile_image_uri;

    newUser.save(function (err) {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'successfully  created new account' });
    });
  });

  // 'v1/user/byEmail/:email'
  api.get('/byEmail/:email', _authMiddleware.authenticate, function (req, res) {
    _user2.default.findOne({ 'email': req.params.email }).exec(function (err, userData) {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(userData);
    });
  });

  // update profile
  api.put('/:id', function (req, res) {
    _user2.default.findById(req.params.id, function (err, user) {
      if (err) {
        res.send(err);
      }
      newUser.first_name = req.body.first_name;
      newUser.last_name = req.body.last_name;
      newUser.about = req.body.about;
      newUser.phone = req.body.phone;
      newUser.verified = req.body.verified;
      newUser.profile_image_uri = req.body.profile_image_uri;

      newUser.save(function (err) {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'successfully  updated' });
      });
    });
  });

  // '/vq/user/:id' -Delete
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _user2.default.remove({
      _id: req.params.id
    }, function (err, user) {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'User Successfully Removed' });
    });
  });

  // '/v1/user/' - Delete all
  api.delete('/', _authMiddleware.authenticate, function (req, res) {
    _user2.default.find({}, function (err, users) {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Users All Removed' });
    });
  });

  return api;
};
//# sourceMappingURL=profile.js.map