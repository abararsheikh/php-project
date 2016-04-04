import React from 'react';

export default class CollapseButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: props.isCollapsed
    }
  }

  handleClick = (event) => {
    this.props.onClick(event);
    this.setState({isCollapsed: !this.state.isCollapsed})
  };

  render() {
    const isCollapsed = this.state.isCollapsed;
    const className = !isCollapsed ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
    const msg = !isCollapsed ? 'collapse' : 'expand';

    return(
        <span className={className}
              onClick={this.handleClick}
              style={{cursor: 'pointer'}}>
          {msg}
        </span>
    )
  }
}