const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const user = require('../model/user');
const tokenChecker = require('./key-check');
const config = require('../config');
const bcrypt=require('bcryptjs');

router.post('/register', (req, res) => {
  mongoose.connect(config.dbAddress, err => {
    if (err) throw err;
    const us = user({
      username: req.body.login,
      password: bcrypt.hashSync(req.body.password,8),
      isAdmin: false
    });
    us.save(er => {
      if (er) throw er;
    });
    res.send({done: true});
  })
});
router.post('', (req, res) => {
  let username='admin';
  let password="fullstack";
  mongoose.connect(config.dbAddress, err => {
    if (err) throw  err;
    user.countDocuments({isAdmin:true}, (err, cnt) => {
      if (err) throw  err;
      if (cnt <= 0) {          //add admin record
        const admin = user({
          username: username,
          password: bcrypt.hashSync(password,8),
          isAdmin: true
        });
        admin.save(er => {
          if (er) throw er;
        });
      }
      user.findOne({username: req.body.login}, (er, record) => {
        if (er) {
          res.send({auth: false, token: null, errorMsg: 'login failed!'});
          return;
        }
        if (!record) {
          res.send({auth: false, token: null, errorMsg: 'Login failed because invalid login information !!'});
          return;
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, record.password);
        if (!passwordIsValid) {
          res.send({auth: false, token: null, errorMsg: 'Invalid login information !'});
          return;
        }

        let key = jwt.sign({id: record._id}, config.secretKey, {expiresIn: (60 * 60 * 24)});     //key is valid for 24 hours
        res.send({auth: true, isAdmin: record.isAdmin, token: key, msg: undefined});
      })
    })
  })
});
router.get('', tokenChecker, (req, res, next) => {      //check if user is admin or not
  res.send({auth: true});
});

module.exports = router;
