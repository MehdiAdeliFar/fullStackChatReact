const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const router = express.Router();
const verifyToken = require('../authenticate/key-check');
const adminCheck = require('../authenticate/admin-check');
const messageModel = require('../model/message');

router.get('/history', verifyToken, adminCheck, (req, res, next) => {
  mongoose.connect(config.dbAddress, er => {
    if (er) throw er;
    messageModel.find({}, (err, data) => {
      if (err) throw err;
      res.send(data);
    })
  })
});
router.post('/roomhistory', verifyToken, adminCheck, (req, res, next) => {
  let roomName = req.body.roomName;
  mongoose.connect(config.dbAddress, er => {
    if (er) throw er;
    messageModel.find({roomName: roomName}, (err, data) => {
      if (err) throw err;
      res.send(data);
    })
  })
});
module.exports = router;
