
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import chatAction from "./chatAction";
class ChatService {


    connect(username) {


        chatAction.socket = io(`http://localhost:3001`, {query: `username=${username}`});
        // this.socket = io(`http://${location.hostname}:3000`, {query: `username=${username}`});
    }

    disconnect() {
        this.leave();
        chatAction.socket.disconnect();
    }

    join(roomName) {
        console.log(roomName);
        chatAction.socket.emit('join', {roomName: roomName});
        chatAction.roomName = roomName;
    }

    sendMessage(message) {
        chatAction.socket.emit('send-message', {roomName: chatAction.roomName, message: message});
    }

    getMessage() {
        return Observable.create(observer => {
            chatAction.socket.on('new-message', data => {
                observer.next(data);
            });
        });
    }

    leave() {
        chatAction.socket.emit('leave', {roomName: chatAction.roomName});
        chatAction.roomName = undefined;
    }
}

export default ChatService;