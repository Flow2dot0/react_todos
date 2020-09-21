const axios = require('axios');


class HelloWorldService {

    executeHelloWorldService = () => axios.get('http://localhost:8080/hello-world');
    executeHelloWorldBeanService = () => axios.get('http://localhost:8080/hello-world-bean');
    executeHelloWorldPathVariableService = (name) => {
        const username = 'usr';
        const password = 'pwd';

        let basicAuth = 'Basic ' + window.btoa(username + ":" + password);
        let config = {
            headers:{
                authorization: 'Basic dXNyOnB3ZA=='
            }
        };
        axios.get(`http://localhost:8080/hello-world/path-variable/${name}`, config);
    };
}

export default new HelloWorldService();
