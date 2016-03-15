import React from 'react';
import LoginApp from './login/LoginApp';
import RegisterApp from './register/RegisterApp';
import LoggedIn from './login/LoggedIn';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

export default class AuthApp extends React.Component {
  currentView;
  showComponent = true;

  constructor() {
    super();
    this.state = this.getAppState();
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
    AppActions.getLogin();
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(this.getAppState());
  };

  getAppState = () => {
    return {
      view: AppStore.getCurrentView(),
      loginStatus: AppStore.getLogin()
    }
  };

  handleViewChange = (event) => {
    let name = event.target.name;
    AppActions.changeView(name);
    this.currentView = this.assignComponent(name);
    if (name === this.state.view) this.showComponent = !this.showComponent;
  };

  assignComponent = (name) => {
    switch (name) {
      case 'login':
        return <LoginApp />;
      case 'register':
        return <RegisterApp />;
    }
  };

  render() {
    if (this.state.loginStatus.isLoggedIn) {
      return <LoggedIn username={this.state.loginStatus.username}/>;
    }

    return (
        <div>
          <button name="login"
                  onClick={this.handleViewChange}>Login
          </button>
          <button name="register"
                  onClick={this.handleViewChange}>Register
          </button>
          {this.showComponent && this.currentView}
        </div>
    )
  }
}