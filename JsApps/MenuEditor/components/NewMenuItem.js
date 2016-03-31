import React from 'react';
import MenuItem from './MenuItem';
import MenuActions from '../actions/MenuActions';

export default class NewMenuItem extends React.Component {
  handleNewItem = () => {
    MenuActions.createMenuItem();
  };

  render() {
    return (
        <div>
          <button onClick={this.handleNewItem}>New Item</button>
          <ul className="sortable" id="newMenu">
            {this.props.newItems.map((item, index) => {
              return (
                  <li key={index} data-id={index}>
                    <MenuItem {...item} onChange={this.props.onChange}/>
                  </li>
              )
            })}
          </ul>
        </div>
    )
  }
}