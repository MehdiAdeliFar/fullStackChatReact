const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const router = express.Router();
const verifyToken = require('../authenticate/key-check');
const adminCheck = require('../authenticate/admin-check');
const eventModel = require('../model/event');
router.get('', verifyToken, adminCheck, (req, res, next) => {
  mongoose.connect(config.dbAddress, er => {
    if (er) throw er;
    eventModel.find({}, (err, data) => {
      if (err) throw err;
      res.send(data);
    })
  })
});
module.exports=router;
