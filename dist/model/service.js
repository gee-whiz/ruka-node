"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require("./review");

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    address: String,
    latitude: Number,
    longitude: Number,
    email_address: String,
    phone: String,
    service_description: String,
    image_uri: String,
    available_time: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]

});

module.exports = _mongoose2.default.model('service', serviceSchema);
//# sourceMappingURL=service.js.map