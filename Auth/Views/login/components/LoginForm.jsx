import React from 'react';
import Input from './Input.jsx!';
export default class LoginForm extends React.Component {

  render() {
    return (
      <form method="post" action="" className="col-sm-8"
            onSubmit={this.props.onSubmit}>
        <Input
          name="username"
          value={this.props.user.username}
          onChange={this.props.onChange}
          label="Username"
          placeholder="username here.."/>

        <Input
          name="password"
          value={this.props.user.password}
          onChange={this.props.onChange}
          type="password"
          label="Password"
          placeholder="Password here.."/>

        {this.props.errorMsg}

        <button type="submit" className="btn btn-default">Login</button>
      </form>
    );
  }
}