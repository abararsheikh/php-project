import React from 'react';
import RegisterForm from './RegisterForm.jsx!';
import RegisterStore from '../../stores/RegisterStore';

export default class RegisterApp extends React.Component {
  constructor() {
    super();
    this.state = {
      register: {
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
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
    this.setState({register: this.state.register})
  };

  validator = {
    username: (event) => {
      console.log('username validator', event.target.value);
    },
    password: (event) => {
      console.log('password validator');
    },
    repeatPassword: (event) => {

      console.log('repeat password');
    },
    email: (event) => {
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