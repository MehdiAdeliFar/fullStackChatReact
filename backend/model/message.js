const mongoose=require('mongoose');
const messaeg_schema=mongoose.Schema({
  username:String,
  date:Date,
  text:String,
  type:String,
  roomName:String
});
module.exports=mongoose.model('message',messaeg_schema);
