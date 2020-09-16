class AuthenticationService {
    registerSuccessfulLogin(username, password){
        console.log('succes log');
        sessionStorage.setItem('authenticatedUser', username);
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
}

export default new AuthenticationService();
