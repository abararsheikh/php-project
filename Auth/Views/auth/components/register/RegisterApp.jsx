import React from 'react';
import RegisterForm from './RegisterForm.jsx!';
import RegisterStore from '../../stores/RegisterStore';
import RegisterActions from '../../actions/RegisterActions';

export default class RegisterApp extends React.Component {
  constructor() {
    super();
    this.state = RegisterStore.getForm();
  }
  componentDidMount() {
    RegisterStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    RegisterStore.removeChangeListener(this._onChange);
  }
  _onChange = () => {
    console.log('on change');
    this.setState(RegisterStore.getForm());
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  handleInputChange = (event) => {
    let values = {
      value: event.target.value,
      isDirty: true
    };
    RegisterStore.updateField(event.target.name, values);
    this.setState(RegisterStore.getForm());
  };

  validator = {
    username: (event) => {
      RegisterActions.validateUsername(this.state.username.value);
    },
    password: (event) => {
      RegisterActions.validatePassword(this.state.password.value);
    },
    repeatPassword: (event) => {
      RegisterActions.validateRepeatPassword(this.state.repeatPassword.value);
    },
    email: (event) => {
      RegisterActions.validateEmail(this.state.email.value);
    }
  };

  render() {
    return (
        <div className="container">
          <RegisterForm
              validator={this.validator}
              fields={this.state}
              onChange={this.handleInputChange}
              onSubmit={this.handleSubmit}
          />
        </div>
    )
  }
}