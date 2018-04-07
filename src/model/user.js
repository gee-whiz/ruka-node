import mongoose  from "mongoose";


let Schema = mongoose.Schema;


let userSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  about: String,
  phone:String,
  verified: Boolean,
  profile_image_uri: String

});

module.exports = mongoose.model('User', userSchema);
