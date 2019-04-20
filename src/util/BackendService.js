import axios from "axios";

class BackendService {

    httpOptions = {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    };
    apiAddress = `http://localhost:3001/api`;
    // apiAddress = `http://${location.hostname}:3000/api`;
    data = {};

    login(loginModel) {
        // console.log(location.hostname);
        return axios.post(this.apiAddress + '/auth/', loginModel, this.httpOptions);
    }


    getRooms() {

        return axios.get(this.apiAddress + '/room', this.getHttpOptions());
    }

    getHttpOptions() {
        const item = localStorage.getItem('token') != null ? localStorage.getItem('token') : '';
        return {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'x-access-token': item}
        };
    }

    register(loginModel) {
        return axios.post(this.apiAddress + '/auth/register', loginModel, this.httpOptions);
    }

    deleteRoom(_id) {

        return axios.delete(`${this.apiAddress}/room/${_id}`, this.getHttpOptions());
    }

    getAdminRooms() {

        return axios.get(this.apiAddress + '/room/adminList', this.getHttpOptions());
    }

    getRoom(id) {

        return axios.get(`${this.apiAddress}/room/${id}`, this.getHttpOptions());
    }

    updateRoom(selectedRoom) {

        let url = `${this.apiAddress}/room/${selectedRoom._id}`;
        let httpOptions1 = this.getHttpOptions();

        return axios.post(url, selectedRoom, httpOptions1);
    }

    addRoom(selectedRoom) {

        return axios.put(this.apiAddress + '/room', JSON.stringify(selectedRoom), this.getHttpOptions());
    }

    getAdminEvents() {
        return axios.get(this.apiAddress + '/eventlog', this.getHttpOptions());
    }

    getMessagesByRoomName(roomName) {
        return axios.post(this.apiAddress + '/message/roomhistory', {roomName: roomName}, this.getHttpOptions());
    }

    getMessages() {
        return axios.get(this.apiAddress + '/message/history', this.getHttpOptions());
    }
}

export default BackendService;