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
            value={this.props.fields.username.value}
            error={this.props.fields.username.error}
            onChange={this.props.onChange}
            onBlur={this.props.validator.username}
        />
        <Input
            name="password"
            label="Password"
            type="password"
            value={this.props.fields.password.value}
            error={this.props.fields.password.error}
            onChange={this.props.onChange}
            onBlur={this.props.validator.password}
        />
        <Strength
            className="col-sm-10 col-sm-offset-2"
            password={this.props.fields.password.value} />
        <Input
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            value={this.props.fields.repeatPassword.value}
            error={this.props.fields.repeatPassword.error}
            onChange={this.props.onChange}
            onBlur={this.props.validator.repeatPassword}
        />
        <Input
            name="email"
            label="Email"
            value={this.props.fields.email.value}
            error={this.props.fields.email.error}
            onChange={this.props.onChange}
            onBlur={this.props.validator.email}
        />
        <button
            disabled={this.props.fields.allValid ? '' : 'disabled'}
            type="submit" name="register" className="btn btn-success">Register</button>
      </form>
    )
  }
}