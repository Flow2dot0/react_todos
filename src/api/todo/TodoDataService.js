import axios from 'axios';
import {API_URL, JPA_API_URL} from "../../Constants";

class TodoDataService {

    retrieveAllTodos = (name) => axios.get(`${JPA_API_URL}/users/${name}/todos`);

    retrieveTodo = (name, id) => axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);

    deleteTodo = (name, id) => axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);

    updateTodo = (name, id, todo) => axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);

    addTodo = (name, todo) => axios.post(`${JPA_API_URL}/users/${name}/todos`, todo);
}

export default  new TodoDataService();
