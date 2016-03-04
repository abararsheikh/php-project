import React from 'react';

export default class Input extends React.Component {

  render() {
    return(
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={this.props.type}
               name={this.props.name}
               className="form-control"
               id={this.props.name}
               placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={this.props.onChange} />
      </div>
    );
  }
}

