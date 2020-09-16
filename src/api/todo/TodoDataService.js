import axios from 'axios';

class TodoDataService {

    retrieveAllTodos = (name) => axios.get(`http://localhost:8080/users/${name}/todos`);

    retrieveTodo = (name, id) => axios.get(`http://localhost:8080/users/${name}/todos/${id}`);

    deleteTodo = (name, id) => axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);

    updateTodo = (name, id, todo) => axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);

    addTodo = (name, todo) => axios.post(`http://localhost:8080/users/${name}/todos`, todo);
}

export default  new TodoDataService();
