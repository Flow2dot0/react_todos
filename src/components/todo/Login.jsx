import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import AuthenticationService from "./AuthenticationService";


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'test',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }


    handleChange(event) {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    // handleUsernameChange(event){
    //     console.log(event.target.value);
    //     this.setState({username: event.target.value});
    // }
    //
    // handlePasswordChange(event){
    //     this.setState({password: event.target.value});
    // }

    loginClicked() {

        if (this.state.username === 'username' && this.state.password === 'password') {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`);
        }
        // this.setState({showSuccessMessage: true, hasLoginFailed: false});
        else {
            this.setState({showSuccessMessage: false, hasLoginFailed: true});

        }
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/*<ShowLoginSuccessful showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name: <input type="text" name="username" value={this.state.username}
                                      onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password}
                                     onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginComponent);
