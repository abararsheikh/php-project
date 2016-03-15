import React from 'react';
import ReactDOM from 'react-dom';
import LoginApp from './components/login/LoginApp';
import RegisterApp from './components/register/RegisterApp';
import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';

class App extends React.Component {
  currentView;
  showComponent = true;
  constructor() {
    super();
    this.state = {
      view: AppStore.getCurrentView()
    };
  }
  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    let view = AppStore.getCurrentView();
    this.setState({view: view});
  };

  handleViewChange = (event) => {
    let name = event.target.name;
    AppActions.changeView(name);
    this.currentView = this.assignComponent(name);
    if (name === this.state.view) this.showComponent = !this.showComponent;
  };

  assignComponent = (name) => {
    switch (name) {
      case 'login': return <LoginApp />;
      case 'register': return <RegisterApp />;
    }
  };

  render() {
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

ReactDOM.render(<App />, document.querySelector('#login'));