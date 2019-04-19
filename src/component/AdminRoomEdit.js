import React from "react";
import BackendService from "../util/BackendService";

class AdminRoomEdit extends React.Component {
    state = {
        error: '',
        id: '-1',
        roomName: '',
        roomStatus: 'active',
        login: '',
        selectedRoom: {}
    };
    backend = new BackendService();

    componentDidMount() {
        this.getLoginName();
        const routeId = this.props.match.params.id; //route.snapshot.paramMap.get('id');
        if (routeId != null) {
            this.setState({id: routeId});
            this.backend.getRoom(routeId).then(v => {
                this.setState({selectedRoom: v.data});
                this.setState({roomName: this.state.selectedRoom.name});
                this.setState({id: this.state.selectedRoom._id});
                this.setState({roomStatus: this.state.selectedRoom.status});

            });

        }
    }

    getLoginName() {
        const item = localStorage.getItem('name');
        this.setState({login: item});
    };

    handleRoomNameChange = (event) => {
        this.setState({roomName: event.target.value});
    };
    handleStatusChange = event => {
        this.setState({roomStatus: event.target.value});

    };
    handleSubmit = event => {

        this.setState({error: ''});
        if (!this.state.roomName) {
            this.setState({error: 'Please Enter the name of Room!'});
            return;
        }
        let currentObj = this;

        if (this.state.selectedRoom._id != null) {
            let newSelectedRoom=this.state.selectedRoom;
            newSelectedRoom.name=this.state.roomName;
            newSelectedRoom.status=this.state.roomStatus==undefined?'active':this.state.roomStatus;
            console.log(newSelectedRoom);
            this.backend.updateRoom(newSelectedRoom).then(a => {
                const {history} = this.props;
                if (history) history.push("/admin-rooms");
                else this.setState({error: 'history not found in props'});

            }, er => {
                const {history} = currentObj.props;
                if (history) history.push("/login");
                else this.setState({error: 'history not found in props'});
            });
        } else {
            this.backend.addRoom({name: this.state.roomName, status: this.state.roomStatus}).then(a => {
                const {history} = this.props;
                if (history) history.push("/admin-rooms");
                else this.setState({error: 'history not found in props'});
            }, er => {
                const {history} = currentObj.props;
                if (history) history.push("/login");
                else this.setState({error: 'history not found in props'});
            });
        }
    };

    render() {
        return (
            <div className="container">

                <h4 className="alert-danger">{this.state.error}</h4>
                <div className="card">
                    <div className="card-header">
                        {this.state.id != '-1' ? 'Edit Room' : 'Add Room'}
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">

                                <div className="col-md-8">

                                    <table className="table table-responsive table-responsive-lg">
                                        <tr>
                                            <td>Name*:</td>
                                            <td><input className="form-control" value={this.state.roomName}
                                                       onChange={this.handleRoomNameChange}/></td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>
                                                <select value={this.state.roomStatus}
                                                        onChange={this.handleStatusChange}>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </td>
                                        </tr>

                                    </table>

                                    <div className="row">
                                        <a href="/admin-rooms" className="btn btn-secondary m-3">Back</a>

                                        <button
                                            type="submit"
                                            className="btn btn-secondary m-3">{this.state.id == '-1' ? 'Add' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default AdminRoomEdit;