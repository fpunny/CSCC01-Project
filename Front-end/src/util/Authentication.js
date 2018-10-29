// Private variables
let _token = null;
let _username = null;
let _potentialUser = null;

class _Authentication {

  /*
    Checks to see if the user is logged in. If so, get the token from localstorage
    and check if valid.
  */
  constructor() {
    const local = localStorage.getItem("token");
    if (local) {
      _token = local;
    }
  }

  /*
    Logs the user in
    @params email and password of user
    @returns the token on sucess, an error otherwise
  */
  login = (email, password) => {
    if (email === "bob" && password === "bob") {
      // TODO: Get the token ffrom backend
      const token = {
        token: "sadsadsadsadsa",
        expires: new Date()
      };
      localStorage.setItem("token", JSON.stringify(this._token));
      return token
    }
    return null
  }

  /*
    Checks if the username that the user enters at login
    exists in the database.
    @params username
    @returns True if exists, false otherwise
  */
  isValidUsername = (username) => {
    // dummy username
    if (username === "bob") {
      _potentialUser = username;
      return true;
    } else {
      _potentialUser = ""
      return false;
    }
  }

  isValidPassForUser = (password) => {
    // dummy username and password
    if (_potentialUser === "bob" && password === "bob"){
      return true;
    } else {
      return false;
    }
  }
  
  /*
    Logs the user out
  */
  logout = () => {
    localStorage.removeItem("token");
    _token = null;
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

  getCurrentUsername = () => _username
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