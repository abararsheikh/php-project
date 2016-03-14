import React from 'react';

export default class LoggedIn extends React.Component {
  render() {
    return(
        <div>
          <p>Logged in as {this.props.username}</p>
          <a href="/Auth/logout">Logout</a>
        </div>
    )
  }
}