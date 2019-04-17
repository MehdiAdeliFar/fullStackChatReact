import React from "react";

class Register extends React.Component {
    state = {
        error: '',
        username: '',
        password: '',
        passwordConfirm: ''
    };
    handleUsernameChange=(event)=>{
      this.setState({username:event.target.value});
    };
    handlePasswordChange=(event)=>{
        this.setState({password:event.target.value});
    };
    handlePasswordConfirmChange=(event)=>{
        this.setState({passwordConfirm:event.target.value});
    };
    handleSubmit=(event)=>{
        event.preventDefault();
        console.log("submitted");
        console.log(this.state.username);
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
                                <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className=" form-control" placeholder=" Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                                <input type="password" className=" form-control" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange}/>
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