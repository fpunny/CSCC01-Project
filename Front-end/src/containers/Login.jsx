import React, { Component } from 'react';
import '../styles/containers/login.scss';
import { withRouter } from 'react-router-dom';
import { Authentication } from '../util';

const auth = Authentication.getInstance();
class _Login extends Component {

  state = {
    username: { text: '', valid: null, check: this.checkEmail },
    password: { text: '', valid: null, check: this.checkPassword }
  }

  authenticate = async el => {
    el.preventDefault();
    const { username, password } = this.state; 
    if (username.valid === true && password.valid === true){
      auth.login(username.text, password.text).then(() => {
        const search = this.getQuery(window.location.search);
        if (search.redirect) {
          this.props.history.push(search.redirect);
        } else {
          this.props.history.push("/app/upload");
        }
      }).catch(err => {
        console.log(err);
      });
    } 
  }

  checkEmail = async () => {

  }

  checkPassword = async () => {

  }

  validClass = ({ text, valid }) => (
    text === ""? "": ` login__input-group--${ valid? "": "in" }valid`
  )

  render() {
    const { username, password } = this.state;
    return (
      <main className="login">
        <form className="login__form" onSubmit={this.authenticate} >
          <h1 className="login__app-name">
              GreenCare
          </h1>
          <div className={`login__input-group${this.validClass(username)}`}>
            <i className="fas fa-user login__icon"></i>
            <input
              type="email"
              name="username"
              placeholder="Username"
              onChange={username.check}
              className="login__input"
            />
          </div>
          <div className={`login__input-group${this.validClass(password)}`}>
            <i className="fas fa-key login__icon"></i>
            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={password.check}
            className="login__input"
            />
          </div>
          <button 
          type="submit"
          className="login__button"
          >
            Login
          </button>
        </form>
      </main>
    )
  }
}

export const Login = withRouter(_Login);
