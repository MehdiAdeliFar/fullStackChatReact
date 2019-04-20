import React from "react";
import BackendService from "../util/BackendService";

class AdminMessage extends React.Component {
    state = {
        login: '',
        messages: []
    };

    componentDidMount() {
        console.log(this.props);
        this.getLoginName();
        this.getMessages();
    }

    getMessages() {
        let backend = new BackendService();
        const roomName =this.props.match.params.name;// this.props.match.params.name;
        // const roomName = this.route.snapshot.paramMap.get('name');
        console.log(this.props);
        if (roomName != null) {
            backend.getMessagesByRoomName(roomName).then(v => this.setState({messages: v.data}));
        } else {
            backend.getMessages().then(v => this.setState({messages: v.data}));
        }
    }

    getLoginName() {
        const item = localStorage.getItem('name');
        this.setState({login: item});
    }

    logout = (event) => {
        localStorage.clear();
        this.disconnect();
        const {history} = this.props;
        if (history) history.push("/login");
        else this.setState({error: 'history not found in props'});
    };

    render() {
        return (
            <div className="container">
                <nav className=" navbar navbar-light bg-light justify-content-between">
                    <a href="/admin-rooms" className="btn btn-secondary">Back</a>

                    <span className="float-right">
    {this.state.login}
  </span>
                    <button onClick={this.logout} className="btn btn-primary float-right">Logout</button>
                </nav>
                <hr/>


                <div className="row">
                    <div className="col">

                        <table className="table table-hover table-bordered m-2">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Username</th>
                                <th>Type</th>
                                <th>Text</th>
                                <th>Room</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.messages.map(msg => (
                                <tr>
                                    <td>{msg.date}</td>
                                    <td>{msg.username}</td>
                                    <td>{msg.type}</td>
                                    <td>{msg.text}</td>
                                    <td>{msg.roomName}</td>
                                </tr>
                            ))}
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminMessage;