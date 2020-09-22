import axios from 'axios';
import {API_URL} from "../../Constants";

class TodoDataService {

    retrieveAllTodos = (name) => axios.get(`${API_URL}/users/${name}/todos`);

    retrieveTodo = (name, id) => axios.get(`${API_URL}/users/${name}/todos/${id}`);

    deleteTodo = (name, id) => axios.delete(`${API_URL}/users/${name}/todos/${id}`);

    updateTodo = (name, id, todo) => axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);

    addTodo = (name, todo) => axios.post(`${API_URL}/users/${name}/todos`, todo);
}

export default  new TodoDataService();
