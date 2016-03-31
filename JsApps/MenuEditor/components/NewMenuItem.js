import React from 'react';
import MenuItem from './MenuItem';
import MenuActions from '../actions/MenuActions';

export default class NewMenuItem extends React.Component {
  static propTypes = {
    newItems: React.PropTypes.array.isRequired
  };
  handleNewItem = () => {
    MenuActions.createMenuItem();
  };
  handleDeleteItem = (event) => {
    const id = event.target.parentNode.parentNode.getAttribute('data-id');
    let menuTree = [].concat(this.props.newItems);
    menuTree.splice(Number(id), 1);
    MenuActions.update(null, menuTree);
  };
  handleInputChange = (event) => {
    const currentMenu = [].concat(this.props.newItems);
    const type = event.target.getAttribute('name');
    const id = $(event.target).closest('li').data('id');
    const item = currentMenu[id];
    item[type] = event.target.value;
    MenuActions.update(null, currentMenu);
  };

  render() {
    return (
        <div>
          <button className="btn btn-success" onClick={this.handleNewItem}>New Item</button>
          <ul className="sortable" id="newMenu">
            {this.props.newItems.map((item, index) => {
              return (
                  <li key={index} data-id={index}>
                    <MenuItem {...item}
                        onChange={this.handleInputChange}
                        onDelete={this.handleDeleteItem}/>
                  </li>
              )
            })}
          </ul>
        </div>
    )
  }
}