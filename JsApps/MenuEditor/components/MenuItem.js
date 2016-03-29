import React from 'react';

export default class MenuItem extends React.Component {

  render() {
    return (
        <p style={{border: '1px solid black', padding: '1em', margin: '0'}}>
          <input type="text" name='name' value={this.props.name} onChange={this.props.onChange}/>:
          <input type="text" name='link' value={this.props.link} onChange={this.props.onChange}/>
        </p>
    );
  }
}