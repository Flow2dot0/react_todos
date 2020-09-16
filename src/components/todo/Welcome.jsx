import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          welcomeMessage : ''
        };
    }


    retrieveWelcomeMessage = () => HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then((response) => this.handleSuccessfulResponsePathVariable(response))
        .catch((error) => this.handleError(error));

    handleSuccessfulResponse =  (response) => this.setState({welcomeMessage: response.data});
    handleSuccessfulResponseBean = (response) => this.setState({welcomeMessage: response.data.message});
    handleSuccessfulResponsePathVariable = (response) => this.setState({welcomeMessage: response.data.message});

    handleError = (error) => this.setState({welcomeMessage: error.response.data.message});

    render() {
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>

                <div className="container">
                    Click here to get a customized welcome message.
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        );
    }
}

export default withRouter(WelcomeComponent);
