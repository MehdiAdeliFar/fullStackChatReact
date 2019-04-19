const mongoose=require('mongoose');
const room_schema=mongoose.Schema({
   name:{type:String,required:true},
  date:Date,
    members:[{
       username:String
    }]
});
module.exports=mongoose.model('room',room_schema);
