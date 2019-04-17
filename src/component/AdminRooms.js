import React from "react";

class AdminRooms extends React.Component {
    state = {
        login: '',
        searchQuery: '',
        rooms: [],
        qRooms: []
    };
    logout = (event) => {

    };
    handleSearchQueryChange = (event) => {
        this.setState({searchQuery: event.target.value});
    };
    deleteRoom = (room) => {
    };

    render() {
        return (
            <div className="container">
                <nav className=" navbar navbar-light bg-light justify-content-between">
                    <a href="/admin-edit-room" className="btn btn-success">Add new Room</a>
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
                    <div className="col-md-3"></div>
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
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            {this.state.qRooms.map(room => (
                                <tr>
                                    <td>{room.name}</td>
                                    <td>{room.date} </td>
                                    <td>{room.members.length}</td>
                                    <td><a href="/history/{{vid.name}}" className="btn btn-secondary">Show Messages</a>
                                    </td>
                                    <td><a href="/admin-edit-room/{{vid._id}}" className="btn btn-secondary">Update</a>
                                    </td>
                                    <td>
                                        <button onClick={this.deleteRoom(room)} className="btn btn-danger">Delete
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