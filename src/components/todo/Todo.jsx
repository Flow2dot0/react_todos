import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import {ErrorMessage, Field, Form, Formik} from "formik";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        };
    }

    componentDidMount() {

        if(this.state.id === -1){
            return
        }
        let username = AuthenticationService.getLoggedUser();
        TodoDataService.retrieveTodo(username, this.state.id).then((response) => {
            this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            });
        });
    }

    onSubmit = (values) => {
        let username = AuthenticationService.getLoggedUser();
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        };


        if(this.state.id === -1){
            TodoDataService.addTodo(username, todo).then(() => this.props.history.push('/todos'));
        }else{
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.history.push('/todos'));
        }
    }

    validate = (values) => {
        let errors = {};
        if (!values.description) {
            errors.description = 'Enter a description';
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 chars';
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Date'
        }
        return errors;
    }

    render() {
        let {description, targetDate} = this.state;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate,}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>
                                (
                                    <Form>
                                        <ErrorMessage name="description" component="div"
                                                      className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div"
                                                      className="alert alert-warning"/>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label></label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button type="submit" className="btn btn-success">Save</button>
                                    </Form>
                                )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default withRouter(TodoComponent);
