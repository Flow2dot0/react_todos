import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginComponent from "./Login";
import WelcomeComponent from "./Welcome";
import ListTodosComponent from "./ListTodos";
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";
import LogoutComponent from "./Logout";
import AuthenticatedRoute from "./AuthenticatedRoute";
import {ErrorComponent} from "./Error";
import TodoComponent from "./Todo";



class TodoApp extends Component{

    render() {
        return(
            <div className="todoApp">

                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/">
                            <LoginComponent/>
                        </Route>
                        <Route path="/login">
                            <LoginComponent/>
                        </Route>
                        <AuthenticatedRoute path="/welcome/:name">
                            <WelcomeComponent/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path="/todos/:id">
                            <TodoComponent/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path="/todos">
                            <ListTodosComponent/>
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path="/logout">
                            <LogoutComponent/>
                        </AuthenticatedRoute>
                        <Route>
                            <ErrorComponent/>
                        </Route>
                    </Switch>
                    <FooterComponent/>
                </Router>
                {/*<LoginComponent/>*/}
                {/*<WelcomeComponent/>*/}
            </div>
        );
    }
}

export default TodoApp;






// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>;
//     }
//     return null;
// }
//
// function ShowLoginSuccessful(props){
//     if(props.showSuccessMessage){
//         return <div>Login Successful</div>;
//     }
//     return null;
// }

