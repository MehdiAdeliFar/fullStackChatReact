const mongoose = require('mongoose');
const eventModel = require('./model/event');
const messageModel = require('./model/message');
const roomModel = require('./model/room');
const config = require('./config');
module.exports = {
  saveEvent: (eventType, username, description) => {
    mongoose.connect(config.dbAddress, (er) => {
      if (er) throw er;
      let eve = eventModel({
        date: new Date(),
        username: username,
        logType: eventType,
        description: description
      });
      eve.save((err, data) => {
        if (err) throw err;
      })
    })
  },
  userSokcets: [],
  saveMessage: (msg, room, username, typ) => {
    mongoose.connect(config.dbAddress, (er) => {
      if (er) throw er;
      let eve = messageModel({
        date: new Date(),
        username: username,
        text: msg,
        type: typ,
        roomName: room
      });
      eve.save((err, data) => {
        if (err) throw err;
      })
    })
  },
  addMember2Room: (room, user) => {
    mongoose.connect(config.dbAddress, (er) => {
      if (er) throw er;
      // roomModel.findOne({name:room},(err,data)=>{
      //   if (err) throw err;
      //   data.members.push(user);
      //   data.save((error,data)=>{
      //     if (error) throw error;
      //   })
      // })
      roomModel.update({name: room}, {$push: {members: {username:user}}}, (error, data) => {
        if (error) throw error;
      });
    })
  },
  removeMemberFromRoom: (room, user) => {
    mongoose.connect(config.dbAddress, (er) => {
      if (er) throw er;
      // roomModel.findOne({name: room}, (err, data) => {
      //   if (err) throw err;
      //   data.members.splice(user);
      //   data.save((error, data) => {
      //     if (error) throw error;
      //   })
      // })
      roomModel.update({name: room}, {$pull: {members: {username:user}}}, (error, data) => {
        if (error) throw error;
      });
    })
  },
  removeUserfromRooms:(username)=>{
    mongoose.connect(config.dbAddress,er=>{
      if (er) throw er;
      roomModel.update({members:{username:username}},{$pull: {members: {username:username}}},(err,data)=>{
        if (err) throw err;
      })
    })
  }
}
;
