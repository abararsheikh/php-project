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
    let value = event.target.value;

    this.state.user[field] = value;
    this.setState({user: this.state.user});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    LoginActions.submitLogin(this.state.user.username, this.state.user.password);
  };

  render() {
    let loginError = this.state.login.error ? <p>{this.state.login.error[0]}</p> : '';
    return (
      <div className="container">
        <LoginForm
          user={this.state.user}
          errorMsg={loginError}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }

}
