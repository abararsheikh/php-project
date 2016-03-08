import React from 'react';
import RegisterForm from './RegisterForm.jsx!';
import RegisterStore from '../../stores/RegisterStore';
import RegisterActions from '../../actions/RegisterActions';

export default class RegisterApp extends React.Component {
  constructor() {
    super();
    this.state = {
      register: {
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
      },
      isDirty: {
        username: false,
        password: false,
        repeatPassword: false,
        email: false
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  handleInputChange = (event) => {
    let field = event.target.name;
    this.state.register[field] = event.target.value;
    this.state.isDirty[field] = true;
    this.setState({
      register: this.state.register,
      isDirty: this.state.isDirty
    });
  };

  validator = {
    username: (event) => {
      if (!this.state.isDirty.username) return;
      RegisterActions.validateUsername(this.state.register.username);
    },
    password: (event) => {
      if (!this.state.isDirty.password) return;
      console.log('password validator');
    },
    repeatPassword: (event) => {
      if (!this.state.isDirty.repeatPassword) return;

      console.log('repeat password');
    },
    email: (event) => {
      if (!this.state.isDirty.email) return;
      console.log('email');
    }
  };

  render() {
    return (
        <div className="container">
          <RegisterForm
              errors={this.state.errors}
              validator={this.validator}
              register={this.state.register}
              onChange={this.handleInputChange}
              onSubmit={this.handleSubmit}
          />
        </div>
    )
  }
}