import mongoose  from "mongoose";
import Review  from "./review";
import Photo   from "./photo";
import Category from "./category";

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
  type:String,
  service_description: String,
  image_uri: String,
  available_time: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  photos:  [{type: Schema.Types.ObjectId, ref: 'Photo'}],
  category: {
    type: Schema.Types.ObjectId, ref: 'category',
    required: true
  }

});

module.exports = mongoose.model('service', serviceSchema);
