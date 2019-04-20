const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const router = express.Router();
const verifyToken = require('../authenticate/key-check');
const adminCheck = require('../authenticate/admin-check');
const roomModel = require('../model/room');
router.delete('/:id', verifyToken, adminCheck, (req, res, next) => {
    let id = req.params.id;
    mongoose.connect(config.dbAddress, er => {
        if (er) throw er;
        let changedId = mongoose.Types.ObjectId(id);
        roomModel.deleteOne({_id: changedId}, (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    })
});
router.get('/adminList', verifyToken, adminCheck, (req, res, next) => {
    mongoose.connect(config.dbAddress, er => {
        if (er) throw er;
        roomModel.find({}, (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    });
});
router.get('/:id', verifyToken, adminCheck, (req, res, next) => {
    let id = req.params.id;
    mongoose.connect(config.dbAddress, er => {
        if (er) throw er;
        let changedId = mongoose.Types.ObjectId(id);
        roomModel.findOne({_id: changedId}, (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    })
});
router.post('/:id', verifyToken, adminCheck, (req, res, next) => {
        console.log("update room")
        let id = req.params.id;
        mongoose.connect(config.dbAddress, er => {
            if (er) throw er;
            let changedId = mongoose.Types.ObjectId(id);
            roomModel.findOne({_id: changedId}, (err, data) => {
                if (err) throw err;
                data.name = req.body.name;
                data.status = req.body.status;
                data.save((error, data) => {
                    if (error) throw error;
                    res.send(data);
                })
            })
        })
    }
);
router.put('', verifyToken, adminCheck, (req, res, next) => {
    mongoose.connect(config.dbAddress, er => {
        if (er) throw er;
        let r = roomModel({
            name: req.body.name,
            status: req.body.status,
            date: new Date(),

        });
        r.save((err, data) => {
            if (err) throw err;
            res.send(data);
        })
    })
});
router.put('/test',(req,res,next)=>{
    console.log("put received");
});
router.get('', verifyToken, (req, res, next) => {
    mongoose.connect(config.dbAddress, er => {
        if (er) throw er;
        roomModel.find({status:'active'}, (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    });
});
module.exports = router;
