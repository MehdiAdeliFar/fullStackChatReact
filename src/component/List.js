import React from "react";
import BackendService from "../util/BackendService";
import ChatService from "../util/ChatService";
import * as chatAction from "../util/chatAction";

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
        let currentObj=this
        backend.getRooms().then(roomList => {
            this.setState({rooms:roomList.data});
            this.setState({qRooms:this.state.rooms});
            this.checkConnection();
        }).catch(er => {
            const { history } = currentObj.props;
            if (history) history.push("/login");
            else this.setState({error:'history not found in props'});
        });


    }
    checkConnection() {
        if (!chatAction.socket) {
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
        const { history } = this.props;
        if (history) history.push("/login");
        else this.setState({error:'history not found in props'});
    };
    handleSearchQueryChanged = (event) => {
        this.setState({searchQuery: event.target.value});
        this.setState({qRooms: this.state.rooms.filter(vid => vid.name.includes(this.state.searchQuery))});
    };


    join = (event) => {
        this.chatService.join(event);
        const { history } = this.props;
        if (history) history.push("/chats");
        else this.setState({error:'history not found in props'});
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

                                        <td>{room.date} </td>
                                        <td>{room.members.length}</td>
                                        <td>
                                            <button
                                                onClick={this.join.bind(this,room.name)}  className="btn btn-secondary">Join
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