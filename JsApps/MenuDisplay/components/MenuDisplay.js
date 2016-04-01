import React from 'react';

export default class MenuDisplay extends React.Component {
  static propTypes = {
    menuName: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {menu: [], menuName: props.menuName};
  }

  componentDidMount() {
    $.getJSON('/api/menu', {name: this.state.menuName}, data => {
      console.log(JSON.parse(data));
      this.setState({menu: JSON.parse(data)});
    });
  }

  drawMenu = (menu) => {
    return menu.map( (item, index) => {
      if ($.isArray(item)) return <ul key={index}>{this.drawMenu(item)}</ul>;
      return (
          <li key={index}><a href={`http://${location.hostname}/${item.link}`}>{item.name}</a></li>
      )
    })
  };

  render() {
    return (
        <ul>
          {this.drawMenu(this.state.menu)}
        </ul>
    )
  }
}