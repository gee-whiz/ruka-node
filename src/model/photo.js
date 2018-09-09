import mongoose  from "mongoose";
import Service from "./service"


let Schema = mongoose.Schema;
let PhotosSchema = new Schema({
    image_uri: {
         type: String,
         required: true
     },
     service: {
       type: Schema.Types.ObjectId, ref: 'service',
       required: true
     }

});
module.exports = mongoose.model('Photo', PhotosSchema);
