"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _service = require("../model/service");

var _service2 = _interopRequireDefault(_service);

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
    var newService = new _service2.default();
    newService.name = req.body.name;
    newService.price = req.body.price;
    newService.address = req.body.address;
    newService.latitude = req.body.latitude;
    newService.email_address = req.body.email_address;
    newService.phone = req.body.phone;
    newService.service_description = req.body.service_description;
    newService.image_uri = req.body.image_uri;
    newService.available_time = req.body.available_time;
    newService.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'service successfully saved' });
    });
  });

  //get all services
  api.get('/', function (req, res) {
    _service2.default.find({}, function (err, services) {
      if (err) {
        res.send(err);
      }
      res.json(services);
    });
  });

  //read one service
  api.get('/:id', function (req, res) {
    _service2.default.findById(req.params.id, function (err, service) {
      if (err) {
        res.send(err);
      }
      res.json(service);
    });
  });

  // update service
  api.put('/:id', function (req, res) {
    _service2.default.findById(req.params.id, function (err, service) {
      if (err) {
        res.send(err);
      }
      service.name = req.body.name;
      service.price = req.body.price;
      service.address = req.body.address;
      service.latitude = req.body.latitude;
      service.email_address = req.body.email_address;
      service.phone = req.body.phone;
      service.service_description = req.body.service_description;
      service.image_uri = req.body.image_uri;
      service.available_time = req.body.available_time;
      service.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: ' service successfully updated' });
      });
    });
  });

  //delete
  api.delete('/:id', function (req, res) {
    _service2.default.remove({
      _id: req.params.id
    }, function (err, service) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'service successfully deleted' });
    });
  });

  //add review for a specific service id

  api.post('/reviews/add/:id', function (req, res) {
    _service2.default.findById(req.params.id, function (err, service) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.service = service._id;
      newReview.rattings = req.body.rattings;
      newReview.save(function (err) {
        if (err) {
          res.send(err);
        }
        service.reviews.push(newReview);
        service.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'service review saved' });
        });
      });
    });
  });

  //get  reviews by service id
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ service: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
};
//# sourceMappingURL=service.js.map