'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _service = require('../controller/service');

var _service2 = _interopRequireDefault(_service);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

var _server = require('../controller/server');

var _server2 = _interopRequireDefault(_server);

var _profile = require('../controller/profile');

var _profile2 = _interopRequireDefault(_profile);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

//connect  to db
(0, _db2.default)(function (db) {
  //initialize middleware
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

  //api routes v1 (/v1)
  router.use('/profile', (0, _profile2.default)({ config: _config2.default, db: db }));
  router.use('/service', (0, _service2.default)({ config: _config2.default, db: db }));
  router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
  router.use('/server', (0, _server2.default)({ config: _config2.default, db: db }));

  //comment
});

exports.default = router;
//# sourceMappingURL=index.js.map