import React from 'react';

export default class CollapseButton extends React.Component {

  constructor() {
    super();
    this.state = {
      collapsed: false
    }
  }

  handleCollapse = (event) => {
    $(event.target).closest('li').children('ul').toggle();
    this.setState({collapsed: !this.state.collapsed});
  };

  render() {
    const className = !this.state.collapsed ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
    const msg = !this.state.collapsed ? 'collapse' : 'expand';
    return(
        <span className={className}
              onClick={this.handleCollapse}
              style={{cursor: 'pointer'}}>
          {msg}
        </span>
    )
  }
}