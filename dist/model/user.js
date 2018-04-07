"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  about: String,
  phone: String,
  verified: Boolean,
  profile_image_uri: String

});

module.exports = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user.js.map