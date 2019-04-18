import React from "react";
import BackendService from "../util/BackendService";

class Register extends React.Component {
    state = {
        error: '',
        username: '',
        password: '',
        passwordConfirm: ''
    };
    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    };
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };
    handlePasswordConfirmChange = (event) => {
        this.setState({passwordConfirm: event.target.value});
    };
    handleSubmit = (event) => {
        event.preventDefault();
        let backend = new BackendService();
        if (!this.state.username || this.state.username.length === 0 || !this.state.password || this.state.password.length === 0) {
            this.setState({error: 'Enter both username and password field'});
            return;
        }
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({error: 'Password and Password confirm not match'});
            return;
        }
        const loginModel = {login: this.state.username, password: this.state.password, _id: ''};
        let currentObj = this;
        backend.register(loginModel).then(res => {
            if (!res) {
                this.setState({error: 'can not register !!!'});
                return;
            } else {

                if (!res.done) {
                    this.setState({error: 'can not register maybe username is exits!!!'});
                    return;
                } else {
                    //todo this.router.navigate(['login']);
                }
            }
        }).catch(er => {
            currentObj.setState({error: er.message});
        });
    };

    render() {
        return (
            <div className="col-md-4 m-auto">
                <h4 className="alert-danger">{this.state.error}</h4>
                <div className="card m-4">
                    <div className="card-header">
                        Register
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" placeholder="Username"
                                       value={this.state.username} onChange={this.handleUsernameChange}/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className=" form-control" placeholder=" Password"
                                       value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                                <input type="password" className=" form-control" placeholder="Confirm Password"
                                       value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange}/>
                            </div>
                            <button className="btn btn-primary " type="submit">Register Me</button>
                            <a href="/login" className="btn btn-secondary m-3">Login</a>
                        </form>

                    </div>
                </div>
            </div>

        )
    }
}

export default Register;