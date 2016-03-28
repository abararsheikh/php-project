import React from 'react';
import MenuItem from './MenuItem';
import MenuStore from '../stores/MenuStore';
import MenuActions from '../actions/MenuActions';
import $ from 'jquery';
import 'jquery-ui';


export default class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }

  componentDidMount() {
    MenuStore.addChangeListener(this._onChange);
    MenuActions.getMenu();
  }

  componentDidUpdate() {
    // jquery ui sortable
    $('.sortable').sortable({
      connectWith: '.sortable',
      placeholder: 'dndPlaceholder'
    }).disableSelection();
  }

  componentWillUnmount() {
    MenuStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState({menu: MenuStore.getMenu()});
    console.log('change');
  };

  drawMenu = (menuItems, baseIndex = '0') => {
    return menuItems.map((item, index) => {
      // don't draw array - submenu
      if ($.isArray(item)) return;
      // unique react id
      const nextItem = menuItems[index + 1];
      // Set submenu
      let subMenu;
      if ($.isArray(nextItem)) subMenu = this.drawMenu(nextItem, index);
      return (
          <li key={baseIndex + index.toString()}>
            <MenuItem  {...item}/>
            <ul className="sortable"
                style={{ minHeight: '20px', border: '1px dashed grey', margin: '0 0 0 1em', padding: '0'}}>{subMenu}</ul>
          </li>
      );
    })
  };

  render() {

    const menuItems = this.state.menu;
    return (
        <div ref="sortable" id="sortableMenu">
          <ul className="sortable">
            {this.drawMenu(menuItems)}
          </ul>
        </div>
    );
  }
}