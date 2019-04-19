import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
class ChatService {

    socket=null;
    roomName='';



    connect(username) {


        this.socket = io(`http://localhost:3001`, {query: `username=${username}`});
        // this.socket = io(`http://${location.hostname}:3000`, {query: `username=${username}`});
    }

    disconnect() {
        this.leave();
        this.socket.disconnect();
    }

    join(roomName) {
        this.socket.emit('join', {roomName: roomName});
        this.roomName = roomName;
    }

    sendMessage(message) {
        this.socket.emit('send-message', {roomName: this.roomName, message: message});
    }

    getMessage() {
        return Observable.create(observer => {
            this.socket.on('new-message', data => {
                observer.next(data);
            });
        });
    }

    leave() {
        this.socket.emit('leave', {roomName: this.roomName});
        this.roomName = undefined;
    }
}

export default ChatService;