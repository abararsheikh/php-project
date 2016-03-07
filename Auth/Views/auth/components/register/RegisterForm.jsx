import React from 'react';
import Input from '../Input.jsx!';
import Strength from '../passStrength/Strength.jsx!';

export default class RegisterForm extends React.Component {

  render() {
    return (
      <form action="" method="post" className="form-horizontal"
            onSubmit={this.props.onSubmit}>
        <Input
            name="username"
            label="Username"
            onChange={this.props.onChange}
            onBlur={this.props.validator.username}
        />
        <Input
            name="password"
            label="Password"
            onChange={this.props.onChange}
            onBlur={this.props.validator.password}
        />
        <Strength
            className="col-sm-10 col-sm-offset-2"
            password={this.props.register.password} />
        <Input
            name="repeatPassword"
            label="Repeat Password"
            onChange={this.props.onChange}
            onBlur={this.props.validator.repeatPassword}
        />
        <Input
            name="email"
            label="Email"
            onChange={this.props.onChange}
            onBlur={this.props.validator.email}
        />
        <button type="submit" name="register" className="btn btn-success">Register</button>
      </form>
    )
  }
}