import mongoose  from "mongoose";
import Service from "./service"

let Schema = mongoose.Schema;


let categorySchema = new Schema({
  name: {
      type: String,
      required: true
  },
  image_uri: String,
  services: [{type: Schema.Types.ObjectId, ref: 'service'}]

});

module.exports = mongoose.model('category', categorySchema);
