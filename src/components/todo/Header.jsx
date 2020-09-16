import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component{


    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="https://getbootstrap.com/docs/4.4/getting-started/introduction/" className="navbar-brand">in28Min</a>
                    </div>
                    <ul className="navbar-nav">
                        {isLoggedIn && <li><Link  className="nav-link" to="/welcome/in28Min">Home</Link></li>}
                        {isLoggedIn && <li><Link  className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isLoggedIn && <li><Link  className="nav-link" to="/login">Login</Link></li>}
                        {isLoggedIn && <li><Link  className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>

        );
    }
}

export default withRouter(HeaderComponent);
