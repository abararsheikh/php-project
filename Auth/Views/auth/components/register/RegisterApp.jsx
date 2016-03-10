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
    this.setState({allValid: RegisterStore.allValid()})
  };

  handleSubmit = (event) => {
    event.preventDefault();
    RegisterActions.registerUser(this.state);
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
    username: () => RegisterActions.validateUsername(this.state.username),
    password: () => RegisterActions.validatePassword(this.state.password),
    repeatPassword: () => RegisterActions.validateRepeatPassword(this.state.repeatPassword, this.state.password.value),
    email: () => RegisterActions.validateEmail(this.state.email)
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