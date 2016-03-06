import React from 'react';
import LoginForm from './LoginForm.jsx!';
import LoginStore from '../stores/LoginStore';

function getAppState() {
  return LoginStore.getAll();
}


export default class LoginApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {username: '', password: ''}
    }
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getAppState());
  }

  setUserState = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    this.state.user[field] = value;
    this.setState({user: this.state.user});

  };

  render() {
    return (
        <div className="row">
          <LoginForm
              user={this.state.user}
              onChange={this.setUserState}/>
        </div>
    )
  }

}