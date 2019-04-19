import React from "react";
import BackendService from "../util/BackendService";

class AdminMessage extends React.Component {
    state = {
        login: '',
        messages: []
    };
    componentDidMount() {
        this.getLoginName();
        this.getMessages();
    }
    getMessages(){
        let backend=new BackendService();
        //todo cahnge this section
        const roomName = this.route.snapshot.paramMap.get('name');
        if (roomName != null) {
            backend.getMessagesByRoomName(roomName).subscribe(v => this.setState({messages : v}));
        } else {
            backend.getMessages().subscribe(v => this.setState({messages : v}));
        }
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

    render() {
        return (
            <div className="container">
                <nav className=" navbar navbar-light bg-light justify-content-between">
                    <a href="/rooms" className="btn btn-secondary">Back</a>

                    <span className="float-right">
    {this.state.login}
  </span>
                    <button onClick={this.logout} className="btn btn-primary float-right">Logout</button>
                </nav>
                <hr/>


                <div className="row">
                    <div className="col">

                        <table className="table table-hover table-bordered m-2">
                            <tr>
                                <th>Date</th>
                                <th>Username</th>
                                <th>Type</th>
                                <th>Text</th>
                                <th>Room</th>
                            </tr>
                            {this.state.messages.map(msg => (
                                <tr>
                                    <td>{msg.date}</td>
                                    <td>{msg.username}</td>
                                    <td>{msg.type}</td>
                                    <td>{msg.text}</td>
                                    <td>{msg.roomName}</td>
                                </tr>
                            ))}


                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminMessage;