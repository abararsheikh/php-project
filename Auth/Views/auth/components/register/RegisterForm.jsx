import React from 'react';
import Input from '../Input.jsx!';
import Username from './Username.jsx!';
import Password from './Password.jsx!';
import Email from './Email.jsx!';

export default class RegisterForm extends React.Component {

  render() {
    return (
        <form action="" method="post" className="form-horizontal"
              onSubmit={this.props.onSubmit}>
          <Username
              onChange={this.props.onChange}
              username={this.props.fields.username}
          />
          <Password
              password={this.props.fields.password}
              repeatPassword={this.props.fields.repeatPassword}
              onChange={this.props.onChange}
          />
          <Email
              email={this.props.fields.email}
              onChange={this.props.onChange}
          />
          <button
              disabled={this.props.fields.allValid ? '' : 'disabled'}
              type="submit" name="register" className="btn btn-success">Register
          </button>
          <p>{this.props.fields.submissionInfo}</p>
        </form>
    )
  }
}