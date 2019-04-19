const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const authenticateSchema = new Schema({
    login: String,
    password: String
  })
;
module.exports=mongoose.model('authenticate',authenticateSchema);
