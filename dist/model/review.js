"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _service = require("./service");

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  rattings: Number,
  service: {
    type: Schema.Types.ObjectId, ref: 'service',
    required: true
  }

});
module.exports = _mongoose2.default.model('Review', ReviewSchema);
//# sourceMappingURL=review.js.map