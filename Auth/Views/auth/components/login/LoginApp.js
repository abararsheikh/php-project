import React from 'react';
import LoginForm from './LoginForm';
import LoginStore from '../../stores/LoginStore';
import LoginActions from '../../actions/LoginActions';

function getLoginState() {
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
    console.log('login state', this.state);
  };

  handleInputChange = (event) => {
    let field = event.target.name;
    this.state.user[field] = event.target.value;
    this.setState({user: this.state.user});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    LoginActions.submitLogin(this.state.user.username, this.state.user.password);
  };

  githubLogin = (event) => {
    event.preventDefault();
    LoginActions.githubLogin();
  };

  render() {
    let loginError = this.state.login.error ? <p>{this.state.login.error}</p> : '';
    return (
      <div className="container">
        <LoginForm
          status={this.state}
          errorMsg={loginError}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }

}
