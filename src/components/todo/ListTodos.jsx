import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from 'moment';

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            todos: []
        };
    }

    componentDidMount() {
        this.refreshTodos();
    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedUser();
        TodoDataService.deleteTodo(username, id)
            .then((response) => {
                this.setState({message: `delete ${id} successful !`});
                this.refreshTodos();
            })

    }

    addTodoClicked = () => {
        this.props.history.push('/todos/-1');
        // let username = AuthenticationService.getLoggedUser();
        // TodoDataService.updateTodo(username, id)
        //     .then((response) => {
        //         this.setState({message: `update ${id} successful !`});
        //         this.refreshTodos();
        //     })

    }

    updateTodoClicked = (id) => {
        this.props.history.push(`/todos/${id}`);
        // let username = AuthenticationService.getLoggedUser();
        // TodoDataService.updateTodo(username, id)
        //     .then((response) => {
        //         this.setState({message: `update ${id} successful !`});
        //         this.refreshTodos();
        //     })

    }

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedUser();
        TodoDataService.retrieveAllTodos(username)
            .then((response) => {
                this.setState({todos: response.data})
            })
            .catch();
    }

    render() {
        return (
            <div>
                <h1> List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>description</th>
                            <th>isCompleted</th>
                            <th>date</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>
                                        <button className="btn btn-success"
                                                onClick={() => this.updateTodoClicked(todo.id)}>Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning"
                                                onClick={() => this.deleteTodoClicked(todo.id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ListTodosComponent);
