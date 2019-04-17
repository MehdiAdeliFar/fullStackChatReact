import React from 'react'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error:''
    };
    handleSubmit=(event)=> {
        event.preventDefault();
        console.log("submited");
    };

    handleUsernameChange=(event)=> {
       this.setState({ username:event.target.value});
    };

    handlePasswordChange=(event) =>{
      this.setState({ password:event.target.value})
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
                                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} className="form-control" placeholder="Username"/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor=" password">Password</label>
                                <input type="password" className=" form-control"  placeholder=" Password" value={this.state.password} onChange={this.handlePasswordChange}/>
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

export  default Login;