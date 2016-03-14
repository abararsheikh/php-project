import React from 'react';
import LoginActions from '../../actions/LoginActions';
import Input from '../Input';
import LoggedIn from './LoggedIn';

export default class LoginForm extends React.Component {
  render() {
    let loginStatus = this.props.status.login;
    if (loginStatus.isLoggedIn) return <LoggedIn username={loginStatus.username}/>;

    return (
        <form method="post" action="" className="form-horizontal"
              onSubmit={this.props.onSubmit}>
          <Input
              name="username"
              value={this.props.status.user.username}
              onChange={this.props.onChange}
              label="Username"
              placeholder="username here.."/>

          <Input
              name="password"
              value={this.props.status.user.password}
              onChange={this.props.onChange}
              type="password"
              label="Password"
              placeholder="Password here.."/>

          {this.props.errorMsg}

          <button type="submit" className="btn btn-default">Login</button>
          <a href="/Auth/login/github">
            <button type="button" className="btn btn-default">sign in with github</button>
          </a>
        </form>

    );
  }
}