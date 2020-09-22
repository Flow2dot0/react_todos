import axios from 'axios';
import {API_URL} from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {
    executeBasicAuthenticationService = (username, password) => {
        return axios.get(`${API_URL}/basicauth`, {headers: {authorization: this.createBasicAuthToken(username, password)}});
    };

    executeJwtAuthenticationService = (username, password) => {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        });
    };

    createBasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(`${username}:${password}`);
    };

    createJwtToken = (token) => 'Bearer ' + token;

    registerSuccessfulLogin(username, password){
        console.log('succes log');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    logout(){
        console.log('delete session');
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null) return false;
        return true;
    }

    getLoggedUser = () => {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user ?? '';
    }

    setupAxiosInterceptors = (token) => {
        console.log(token);
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }


}

export default new AuthenticationService();
