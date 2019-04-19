import React from "react";
import BackendService from "../util/BackendService";

class AdminEvents extends React.Component {
    state = {
        login: '',
        events:[]
    };
    componentDidMount() {
        this.getLoginName();
        this.getEvents();
    }
    getEvents(){
        let currentObj=this;
        let backend=new BackendService();
        backend.getAdminEvents().then(event => this.setState({events : event.data}), er => {
            const {history} = currentObj.props;
            if (history) history.push("/login");
            else this.setState({error: 'history not found in props'});
        });
    }
    getLoginName() {
        const item = localStorage.getItem('name');
        this.setState({login: item});
    }
    logout = (event) => {
        localStorage.clear();
        // this.disconnect();
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
                            <tr>
                                <th>Create Date</th>
                                <th>Username</th>
                                <th>Event Type</th>
                                <th>Description</th>
                            </tr>
                            {this.state.events.map(ev=>(
                                <tr>
                                    <td>{ev.date}</td>
                                    <td>{ev.username}</td>
                                    <td>{ev.username}</td>
                                    <td>{ev.logType}</td>
                                    <td>{ev.description}</td>
                                </tr>
                            ))}

                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminEvents