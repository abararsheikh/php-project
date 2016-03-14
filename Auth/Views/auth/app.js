import React from 'react';
import ReactDOM from 'react-dom';
import LoginApp from './components/login/LoginApp';
import RegisterApp from './components/register/RegisterApp';
import {Router, Route, Link, browserHistory, IndexRedirect} from 'react-router';

class App extends React.Component {
  render() {
    return (
        <div>
          <ul>
            <li><Link to="/Auth/login">Login</Link></li>
            <li><Link to="/Auth/register">Register</Link></li>
          </ul>
          {this.props.children}
        </div>
    )
  }
}

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/Auth" component={App}>
        <Route path="login" component={LoginApp} />
        <Route path="register" component={RegisterApp} />
      </Route>
    </Router>
    ), document.querySelector('#login')
);