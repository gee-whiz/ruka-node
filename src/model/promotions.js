import mongoose  from "mongoose";




let Schema = mongoose.Schema;


let promotionSchema = new Schema({
  name: {
      type: String,
      required: true
  },
   budget: {
      type: String,
      required: true
  },
  owner: String,
  email_address: String,
  phone:String,
  type:String,
  link: String,
  image_uri: String,
  start_date: String,
  end_date: String,
  position: Number


});

module.exports = mongoose.model('Promotions', promotionSchema);
