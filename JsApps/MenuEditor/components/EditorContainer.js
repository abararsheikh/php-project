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
    $('#sortableMenu ul').sortable({
      connectWith: '#sortableMenu ul',
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

  _getMenuItemValue = (menu) => {
    return $(menu).children().toArray().reduce((acc, item, index, array) => {
      console.log(item);
      console.log($(item).find('input[name="name"]').first().val());
      acc.push({
        name: $(item).find('input[name="name"]').val(),
        link: $(item).find('input[name="link"]').val()
      });
      if ($(item).find('ul').toArray().length > 1) {
        acc.push(this._getMenuItemValue()
      }
      return acc;
    }, [])
  };

  saveMenu = (event) => {
    const menuTree = $('#sortableMenu > ul');

    const menu = this._getMenuItemValue(menuTree);

    console.log(menu);
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
            <ul style={{ minHeight: '20px', border: '1px dashed grey', margin: '0 0 0 1em', padding: '0'}}>{subMenu}</ul>
          </li>
      );
    })
  };

  render() {

    const menuItems = this.state.menu;
    return (
        <div ref="sortable" id="sortableMenu">
          <ul>
            {this.drawMenu(menuItems)}
          </ul>

          <button onClick={this.saveMenu}>Save</button>
        </div>
    );
  }
}