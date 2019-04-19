const app = require('./backend/app');
const http = require('http');
const io = require('socket.io');
const eventManager = require('./backend/eventManager');

const port = process.env.PORT || "3001";

app.set('port', port);

const server = http.createServer(app);
server.listen(port
  // ,  () => {
  // console.log(`Server running at http://${hostname}:${port}/`);
// }
);
let chatIo = io.listen(server);

function getUserName(socket) {
  let record = eventManager.userSokcets.filter(a => a.socketId == socket.id);
  return record.length > 0 ? record[0].username : ''
}

function sendMessage(socket, data) {
  console.log(socket.rooms);
  let userName = getUserName(socket);
  eventManager.saveEvent('send message', userName, `message: ${data.message} sent to room: ${data.roomName}`);
  console.log('message sent from ' + socket.id+'msg:'+data.message+ " room :"+data.roomName);
  eventManager.saveMessage(data.message, data.roomName, userName, "message");
  chatIo.to(data.roomName).emit('new-message', {
    text: data.message,
    username: userName,
    date: new Date(),
    type: 'message',
    roomName: data.roomName
  });
}

chatIo.on('connection', (socket) => {
  let username = socket.handshake.query.username;
  console.log(`${username} connected`);
  eventManager.saveEvent('connect', username, 'user connected');
  eventManager.userSokcets.push({username: username, socketId: socket.id});
  socket.on('disconnect', () => {
    console.log("socket disconnected");
    eventManager.saveEvent('disconnect', getUserName(socket), 'user disconnected');
    eventManager.removeUserfromRooms(getUserName(socket));
  });



  socket.on('send-message', data => {
    sendMessage(socket, data);

  });



  socket.on('join', data => {
    let userName = getUserName(socket);
    eventManager.saveEvent('join room', userName, `user joined to room: ${data.roomName}`);
    eventManager.addMember2Room(data.roomName, userName);

    chatIo.in(data.roomName).emit('new-message', {
      text: `${userName} joined to room`,
      username: userName,
      date: new Date(),
      type: 'join',
      roomName: data.roomName
    });
    socket.join(data.roomName);
    console.log("join");
    console.log(data);
  });



  socket.on('leave', data => {
    eventManager.saveEvent('leave room', getUserName(socket), `user left the room: ${data.roomName}`);
    let userName = getUserName(socket);
    socket.leave(data.roomName);
    eventManager.removeMemberFromRoom(data.roomName, userName);
    chatIo.to(data.roomName).emit('new-message', {
      text: `${username} left the room`,
      username: userName,
      date: new Date(),
      type: 'left',
      roomName: data.roomName
    });

    console.log("leave");
  })
});
