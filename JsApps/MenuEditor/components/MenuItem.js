import React from 'react';

export default class MenuItem extends React.Component {

  render() {
    return (
        <p style={{border: '1px solid black', padding: '1em', margin: '0'}}>
          <input type="text" name='name' disabled defaultValue={this.props.name}/>:
          <input type="text" name='link' disabled defaultValue={this.props.link}/>
        </p>
    );
  }
}