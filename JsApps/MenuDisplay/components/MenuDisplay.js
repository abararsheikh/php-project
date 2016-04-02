import React from 'react';
import '../style.css!';

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
    return menu.map((item, index) => {
      let submenu = "";
      if ($.isArray(item)) return;
      if ($.isArray(menu[index + 1])) submenu = (
          <ul key={index}>{this.drawMenu(menu[index + 1])}</ul>
      );
      return (
          <li key={index}><a href={`http://${location.hostname}/${item.link}`}>{item.name}</a>{submenu}</li>
      )
    })
  };

  render() {
    return (
        <div className="navigation">
          <ul>
            {this.drawMenu(this.state.menu)}
          </ul>
        </div>
    )
  }
}