import React from "react";

class List extends React.Component {
    state = {
        login: '',
        searchQuery: '',
        rooms: [],
        qRooms: []
    };
    logout = (event) => {

    };
    handleSearchQueryChanged = (event) => {
        this.setState({searchQuery: event.target.value});
    }
    ;
    join=roomName=>{

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