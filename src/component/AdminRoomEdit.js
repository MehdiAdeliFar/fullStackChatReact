import React from "react";
import BackendService from "../util/BackendService";

class AdminRoomEdit extends React.Component {
    state = {
        error: '',
        id: '-1',
        roomName: '',
        roomStatus: '',
        login: '',
        selectedRoom: {}
    };
    backend = new BackendService();

    componentDidMount() {
        this.getLoginName();
        //todo const routeId = this.route.snapshot.paramMap.get('id');
        let routeId = 1;
        if (routeId != null) {
            this.setState({id: routeId});
            this.backend.getRoom(this.id).subscribe(v => this.setState({selectedRoom: v}));
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
        if (!this.state.selectedRoom.name) {
            this.error = 'Please Enter the name of Room!';
            return;
        }
        if (this.selectedRoom._id != null) {
            this.backend.updateRoom(this.selectedRoom).subscribe(a => {
                //todo this.router.navigate(['rooms']);
            }, er => this.router.navigate(['login']));
        } else {
            this.backend.addRoom(this.selectedRoom).subscribe(a => {
                //todo this.router.navigate(['rooms'])
            }, er => {
                //todo  this.router.navigate(['login'])
            });
        }
    };

    render() {
        return (
            <div className="container">

                <h4 className="alert-danger">{this.state.error}</h4>
                <div className="card">
                    <div className="card-header">
                        {this.state.id != '-1' ? 'Edit Room' : 'Add Room'}}
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
                                        <button
                                            onClick={this.getBack} className="btn btn-secondary m-3">Back
                                        </button>
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