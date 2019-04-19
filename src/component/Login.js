import React from 'react'
import BackendService from "../util/BackendService";
import ChatService from "../util/ChatService";

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: ''
    };
    chatService = new ChatService();

    connect() {
        this.chatService.connect(this.login);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({error: ''});
        if (this.state.username.length == 0 || this.state.password.length == 0) {
            this.setState({error: 'fill username and password'});
            return;
        }
        let backend = new BackendService();
        let currentObj=this;
        backend.login({login: this.state.username, password: this.state.password}).then(res => {
            if (!res.data) {
                this.setState({error: 'can not login'});
                return;
            } else {

                if (!res.data.auth) {
                    this.setState({error: res.data.errorMsg});
                    this.setState({login: ''});
                    this.setState({password: ''});
                    return;
                }
                if (res.data.auth) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('name', this.state.username);
                    this.setState({error: ''});
                    const { history } = this.props;
                    console.log(history);
                    if (res.data.isAdmin) {

                        if (history) history.push("/admin-rooms");
                        else this.setState({error:'history not found in props'});
                    } else {
                        this.connect();
                        if (history) history.push("/list");
                        else this.setState({error:'history not found in props'})
                    }

                }
            }
        }).catch(er=> {

            currentObj.setState({error:er.message});
        });
    };

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    render() {
        return (
            <div className="col-md-4 m-auto">
                <h4 className="alert-danger">{this.state.error}</h4>
                <div className="card m-4">
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" value={this.state.username} onChange={this.handleUsernameChange}
                                       className="form-control" placeholder="Username"/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor=" password">Password</label>
                                <input type="password" className=" form-control" placeholder=" Password"
                                       value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <button className="btn btn-success " type="submit">Login
                            </button>
                            <a href="/register" className="btn btn-secondary m-3">Sign Up</a>
                        </form>
                    </div>

                </div>
            </div>
        )
    }


}

export default Login;