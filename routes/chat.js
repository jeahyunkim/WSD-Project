/**
 * Created by jinho on 2016-12-07.
 */
var express = require('express');
var CLIENT={gyeonggi:[],seoul:[],chungbuk:[],chungnam:[],gyeongbuk:[],gyeongnam:[],jeonbuk:[],jeonnam:[],jeju:[]};
var router = express.Router();

var Message = require('../models/message');

router.post('/getMessage',function (req, res) {
    Message.find({location:req.body.location},function (err, result) {
        res.send({messages: result, id:req.session.userInfo.user_id});
    })
});

router.websocket('/',function (info, cb, next) {

    cb(function (socket) {
        console.log('connection');
        eval('CLIENT.'+info.req.query.location+'.push(socket)');

        socket.on('close',function () {
            console.log('close')
            var clients = eval('CLIENT.'+info.req.query.location);
            for(var i = 0; i < clients.length; i++){
                if(clients[i] == socket){
                    clients.splice(i,1);
                }
            }
        })

        socket.on('message',function (message) {

            var chatMessage = new Message();
            var senderId = info.req.session.userInfo.user_id;
            chatMessage.location = info.req.query.location;
            chatMessage.userId = senderId;
            chatMessage.message = message;
            chatMessage.time = new Date();
            chatMessage.save(function (err) {
                if(err) console.log("Something went wrong while saving the thing");
                else{
                    var clients = eval('CLIENT.'+info.req.query.location);
                    console.log(clients.length);
                    for(var i = 0; i < clients.length; i++){
                        clients[i].send(message+'/'+senderId);
                    }
                }
            })
        })
    })
})


module.exports = router;