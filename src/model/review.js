import mongoose  from "mongoose";
import Service from "./service"


let Schema = mongoose.Schema;
let ReviewSchema = new Schema({
    username: {
         type: String,
         required: true
     },
     title: String,
     text: String,
     rattings: Number,
     time_stamp: String,
     service: {
       type: Schema.Types.ObjectId, ref: 'service',
       required: true
     }

});
module.exports = mongoose.model('Review', ReviewSchema);
