import React from 'react';
import update from 'react/lib/update';
import MenuItem from './MenuItem';
import MenuStore from '../stores/MenuStore';
import MenuActions from '../actions/MenuActions';
import $ from 'jquery';
import 'jquery-ui';


export default class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = MenuStore.getState();
  }

  componentDidMount() {
    MenuStore.addChangeListener(this._onChange);
    MenuActions.getMenu();
  }

  componentDidUpdate() {
    // jquery ui sortable
    $('ul.sortable').sortable({
      connectWith: 'ul.sortable',
      update: this.handleDrop,
      placeholder: 'dndPlaceholder'
    }).disableSelection();

    // Display toastr message
    if (this.state.toastr) this.state.toastr();
  }

  componentWillUpdate() {
    $('ul.sortable').sortable("destroy");
  }

  componentWillUnmount() {
    MenuStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(MenuStore.getState());
    console.log('change');
  };

  /*****************
   * Methods
   *****************/
  saveMenu = (event) => {
    MenuActions.saveMenu(this.state.menu);
  };

  handleInputChange = (event) => {
    const currentMenu = this.state.menu[this.state.num];
    const type = event.target.getAttribute('name');
    const id = event.target.parentNode.parentNode.getAttribute('data-id');
    const item = id.split('').reduce((acc, item) => {
      return acc[item];
    }, currentMenu.menu);
    item[type] = event.target.value;
    this.setState(update(this.state.menu, {
      $apply: (menuState) => {
        menuState[this.state.num] = currentMenu;
        return menuState;
      }
    }))
  };


  handleDrop = (event, ui) => {
    const menu = this._getMenuItemValue($('#sortableMenu > ul'));
    const newMenuState = update(this.state.menu, {
      $apply: (menuState) => {
        menuState[this.state.num].menu = menu;
        return menuState;
      }
    });
    // Disable jquery dnd, and let React handle DOM update
    $('ul.sortable').sortable('cancel');
    MenuActions.update(newMenuState);
  };

  handleMenuChange = (event) => {
    // need to save menu
    const menuNum = event.target.getAttribute('name');
    MenuActions.switchMenu(menuNum);
  };

  /*****************
   * Display
   *****************/
  drawMenu = (menuItems, baseIndex = '') => {
    return menuItems.map((item, index) => {
      // don't draw array - submenu
      if ($.isArray(item)) return;
      // unique react id
      const id = baseIndex + index.toString();
      const nextItem = menuItems[index + 1];
      // Set submenu
      let subMenu;
      if ($.isArray(nextItem)) subMenu = this.drawMenu(nextItem, baseIndex + 1);
      return (
          <li key={id} data-id={id}>
            <MenuItem  {...item} onChange={this.handleInputChange}/>
            <ul className="sortable" style={{ minHeight: '20px', margin: '0 0 0 1em', padding: '0'}}>{subMenu}</ul>
          </li>
      );
    })
  };

  render() {
    if (this.state.menu.length === 0) return (<div>loading...</div>);
    const menuItems = this.state.menu;
    const currentMenu = this.state.num;
    return (
        <div>
          <ul>{this.state.menu.map((m, i) => (
              <li key={i} name={i} onClick={this.handleMenuChange}>{m.name}</li>
          ))}
          </ul>
          <h1>{menuItems[currentMenu].name}</h1>
          <div ref="sortable" id="sortableMenu">
            <ul className="sortable">
              {this.drawMenu(this.state.menu[this.state.num].menu)}
            </ul>
            <button onClick={this.saveMenu}>Save</button>
          </div>
        </div>
    );
  }

  /*****************
   * Private
   *****************/
  _getMenuItemValue = (menu) => {
    return $(menu).children().toArray().reduce((acc, item) => {
      acc.push({
        name: $(item).find('input[name="name"]').first().val(),
        link: $(item).find('input[name="link"]').first().val()
      });
      if ($(item).children().find('ul').toArray().length > 0) {
        acc.push(this._getMenuItemValue($(item).children('ul')));
      }
      return acc;
    }, [])
  };
}