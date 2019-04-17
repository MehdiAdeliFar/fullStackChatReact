import React from "react";

class AdminMessage extends React.Component {
    state = {
        login: '',
        messages: []
    };
    logout = (event) => {

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