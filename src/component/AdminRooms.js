import React from "react";
import BackendService from "../util/BackendService";

class AdminRooms extends React.Component {
    state = {
        login: '',
        searchQuery: '',
        rooms: [],
        qRooms: []
    };
    backend = new BackendService();
    componentDidMount() {
        this.getLoginName();
        this.getRooms();


    }
    getLoginName() {
        const item = localStorage.getItem('name');
        this.setState({login: item});
    }
    getRooms() {
        let currentObj=this;
        this.backend.getAdminRooms().then(roomList => {
            this.setState({rooms: roomList.data});
            this.setState({qRooms: roomList.data});
        }).catch(er => {
            const { history } = currentObj.props;
            if (history) history.push("/login");
        });
    }

    logout = (event) => {
        localStorage.clear();
        // this.disconnect();
        const { history } = this.props;
        if (history) history.push("/login");
    };
    handleSearchQueryChange = (event) => {
        this.setState({searchQuery: event.target.value});
        this.setState({qRooms: this.state.rooms.filter(vid => vid.name.includes(this.state.searchQuery))});
    };
    deleteRoom = (room) => {
        this.backend.deleteRoom(room._id).then(res=>{
            this.getRooms()
        });
    };

    render() {
        return (
            <div className="container">
                <nav className=" navbar navbar-light bg-light justify-content-between">
                    <a href="/edit-room" className="btn btn-success">Add new Room</a>
                    <a href="/admin-room-log" className="btn btn-info">Show Events</a>
                    <a href="/history" className="btn btn-info">Show Messages history</a>

                    <span className="float-right">
    {this.state.login}
  </span>
                    <button onClick={this.logout} className="btn btn-primary float-right">Logout</button>
                </nav>
                <hr/>

                <br/>
                <div className="row">
                    <div className="col-md-3"/>
                    <div className="align-self-center col-md-5">
                        <div className="form-group  ">
                            <input className="form-control" onChange={this.handleSearchQueryChange}
                                   placeholder="Search"/>
                        </div>
                    </div>
                    <div className="col-md-2">

                    </div>
                </div>

                <div className="row">
                    <div className="col">

                        <table className="table table-hover table-bordered m-2">
                            <tr>
                                <th>Name</th>
                                <th>Create Date</th>
                                <th>Members</th>
                                <th/>
                                <th/>
                                <th/>
                            </tr>
                            {this.state.qRooms.map(room => (
                                <tr>
                                    <td>{room.name}</td>
                                    <td>{room.date} </td>
                                    <td>{room.members.length}</td>
                                    <td><a href={'/history/'+room.name} className="btn btn-secondary">Show Messages</a>
                                    </td>
                                    <td><a href={'/edit-room/'+room._id} className="btn btn-secondary">Update</a>
                                    </td>
                                    <td>
                                        <button onClick={this.deleteRoom.bind(this,room)} className="btn btn-danger">Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default AdminRooms;