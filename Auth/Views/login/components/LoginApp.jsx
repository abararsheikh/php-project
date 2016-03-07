import React from 'react';
import LoginForm from './LoginForm.jsx!';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

function getLoginState() {
  console.log(LoginStore.getLoginState());
  return LoginStore.getLoginState();
}

export default class LoginApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {username: '', password: ''},
      login: {isLoggedIn: false, error: []}
    }
  }
  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }
  _onChange = () => {
    console.log('on change');
    this.setState({login: getLoginState()});
    console.log(this.state);
  };

  setUserState = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    this.state.user[field] = value;
    this.setState({user: this.state.user});
  };

  submitLogin = (event) => {
    event.preventDefault();
    LoginActions.submitLogin(this.state.user.username, this.state.user.password);
  };

  render() {
    let loginError = this.state.login.error ? <p>{this.state.login.error[0]}</p> : '';
    return (
      <div className="row">
        <LoginForm
          user={this.state.user}
          errorMsg={loginError}
          onChange={this.setUserState}
          onSubmit={this.submitLogin}
        />
      </div>
    )
  }

}
