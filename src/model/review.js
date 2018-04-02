import mongoose  from "mongoose";
import Service from "./service"


let Schema = mongoose.Schema;
let ReviewSchema = new Schema({
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
module.exports = mongoose.model('Review', ReviewSchema);
