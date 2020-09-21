import axios from 'axios';

class AuthenticationService {
    executeBasicAuthenticationService = (username, password) => {
        return axios.get('http://localhost:8080/basicauth', {headers: {authorization: this.createBasicAuthToken(username, password)}});
    };

    createBasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(`${username}:${password}`);
    };

    registerSuccessfulLogin(username, password){
        console.log('succes log');
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    logout(){
        console.log('delete session');
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        if(user===null) return false;
        return true;
    }

    getLoggedUser = () => {
        let user = sessionStorage.getItem('authenticatedUser');
        return user ?? '';
    }

    setupAxiosInterceptors = (basicAuthHeader) => {
        console.log(basicAuthHeader);
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader;
                }
                return config;
            }
        )
    }


}

export default new AuthenticationService();
