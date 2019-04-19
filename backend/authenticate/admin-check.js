const mongoose=require('mongoose');
const userModel=require('../model/user');
const config=require('../config');
function adminCheck(req,res,next) {
  let id=req.userId;

  mongoose.connect(config.dbAddress, er => {
    if (er) throw er;
    let changedId=mongoose.Types.ObjectId(id);
    userModel.findOne({_id:changedId},(err,data)=>{
      if (!data.isAdmin){
        // console.log("Admin not Found");
        return res.status(403).send({auth:false,message:'Access denied'});
      }
      req.userId=id;
      next();

    })
  });

}
module.exports=adminCheck;
