import { server } from '.';

// Private variables
let _token = null;
let _user = null;

class _Authentication {

  /*
    Checks to see if the user is logged in. If so, get the token from localstorage
    and check if valid.
  */
  constructor() {
    const local = localStorage.getItem("token");
    if (local) {
      _token = local;
      _user = JSON.parse(localStorage.getItem("user"));
    }
  }

  /*
    Logs the user in
    @params email and password of user
    @returns the token on sucess, an error otherwise
  */
  login = async (email, password) => {
    const data = await server(
      '/login',
      'POST',
      JSON.stringify({ email, password })
    );

    _user = data;
    _token = data.token;
    localStorage.setItem('token', _token);
    localStorage.setItem('user', JSON.stringify(_user));
    return data;
  }
  
  /*
    Logs the user out
  */
  logout = async () => {
    const data = await server(
      '/logout',
      'POST'
    );

    _token = null;
    _user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return data;
  }

  /*
    Checkes the Authentication of the user
    @returns true if authenticated, false otherwise
  */
  isAuthenticated = () => _token? true: false

  /*
    Gets the token of the user
    @return The token if authenicated, null otherwise
  */
  getToken = () => _token
  getUser = () => _user
}

/* Singleton for authentication object */
let instance;
export const Authentication = {
  getInstance: () => {
    if (!instance) {
      instance = new _Authentication();
    }
    return instance
  }
};