import React from 'react';
import MenuActions from '../actions/MenuActions';

export default class MenuTab extends React.Component {
  static propTypes = {
    menu: React.PropTypes.array.isRequired,
    current: React.PropTypes.number.isRequired
  };

  handleMenuChange = (event) => {
    const menuNum = +event.target.getAttribute('data-index');
    MenuActions.switchMenu(menuNum);
  };
  handleCreateMenu = (event) => {
    MenuActions.createNewMenu();
  };
  handleDelete = (index) => (event) => {
    MenuActions.deleteMenu(index);
  };
  handleMenuNameChange = (index) => (event) => {
    MenuActions.updateName(event.target.value, index);
  };

  render() {
    // todo: add double click to rename
    return (
        <nav className="nav nav-tabs">
          {this.props.menu.map((item, index) => {
            const className = this.props.current === index ? 'active' : '';
            return <li role="presentation" key={index} className={className}>
              <a
                  href="#home"
                  data-index={index}
                  onClick={this.handleMenuChange}>
                <input type="text" value={item.name} onChange={this.handleMenuNameChange(index)}/>
                <span style={{color:'red', cursor: 'pointer'}} onClick={this.handleDelete(index)}>&#10005;</span>
              </a>
            </li>
          })}
          <li role="presentation">
            <a href="#" onClick={this.handleCreateMenu}>+</a>
          </li>
        </nav>
    )
  }
}