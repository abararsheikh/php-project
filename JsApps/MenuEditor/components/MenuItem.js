import React from 'react';

export default class MenuItem extends React.Component {

  render() {
    return (
        <p style={{border: '1px solid black', padding: '1em'}}>{this.props.id}: {this.props.name}</p>
    );
  }
}