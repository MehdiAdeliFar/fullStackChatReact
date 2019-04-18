import React from "react";
import BackendService from "../util/BackendService";
import ChatService from "../util/ChatService";

class List extends React.Component {
    state = {
        login: '',
        searchQuery: '',
        rooms: [],
        qRooms: []
    };
    chatService=new ChatService();
    componentDidMount() {
        let backend = new BackendService();
        this.getLoginName();
        backend.getRooms().then(roomList => {
            this.setState({rooms:roomList});
            this.checkConnection();
        }).catch(er => {
            //todo this.router.navigate(['login'];
        });


    }
    checkConnection() {
        if (!this.chatService.socket) {
            this.chatService.connect(this.login);
        }
    }


    disconnect() {
        this.chatService.disconnect();
    }
    getLoginName() {
        const item = localStorage.getItem('name');
        this.setState({login: item});
    }

    logout = (event) => {
        localStorage.clear();
        this.disconnect();
        //todo this.router.navigate(['login']);
    };
    handleSearchQueryChanged = (event) => {
        this.setState({searchQuery: event.target.value});
        this.setState({qRooms: this.state.rooms.filter(vid => vid.name.includes(this.state.searchQuery))});
    };


    join = roomName => {
        this.chatService.join(roomName);
        //todo this.router.navigate(['chats']);
    };

    render() {
        return (
            <div className="container">
                <nav className=" navbar navbar-light bg-light">
                    <span>Room List</span>


                    <span>{this.state.login}</span>
                    <button onClick={this.logout} className="btn btn-primary float-right">Logout</button>
                </nav>
                <hr/>
                <div className="row">
                    <div className="col">
                        <div className="form-group col-md-5 m-auto">
                            <input className="form-control" value={this.state.searchQuery}
                                   onChange={this.handleSearchQueryChanged} placeholder="Search"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-hover table-bordered m-2">
                            <tr>
                                <th>Name</th>
                                <th>Create Date</th>
                                <th>Members</th>

                                <th></th>
                            </tr>


                            {this.state.qRooms.map(room => (
                                    <tr>
                                        <td>{room.name}</td>
                                        <td>{room.name}</td>
                                        <td>{room.date} </td>
                                        <td>{room.members.length}</td>
                                        <td>
                                            <button
                                                onClick={this.join(room.name)} className="btn btn-secondary">Join
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}


                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default List;