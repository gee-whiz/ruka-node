import mongoose  from "mongoose";
import Review  from "./review";

let Schema = mongoose.Schema;


let serviceSchema = new Schema({
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
  phone:String,
  service_description: String,
  image_uri: String,
  available_time: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]



});

module.exports = mongoose.model('service', serviceSchema);
