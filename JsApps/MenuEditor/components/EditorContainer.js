import React from 'react';
import MenuItem from './MenuItem';
import MenuStore from '../stores/MenuStore';
import $ from 'jquery';
import 'jquery-ui';


export default class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: MenuStore.getMenu()
    };
  }
  componentDidMount() {
    MenuStore.addChangeListener(this._onChange);
    $('#sortableMenu ul').sortable({
      connectWith: '#sortableMenu ul',
      placeholder: 'dndPlaceholder'
    }).disableSelection();
  }
  componentWillUnmount() {
    MenuStore.removeChangeListener(this._onChange);
  }
  _onChange = () => {
    this.setState(MenuStore.getMenu());
  };

  drawMenu = (menuItems, baseIndex = '0') => {
    return (
        <ul key={baseIndex}>
          {menuItems.map((item, index) => {
            // don't draw array - submenu
            if($.isArray(item)) return;
            // Set submenu
            let subMenu = '';
            const nextItem = menuItems[index + 1];
            if ($.isArray(nextItem)) subMenu = this.drawMenu(nextItem, index);
            return (
                <li key={baseIndex + index.toString()}>
                  <MenuItem  {...item}/>
                  <ul style={{
                    margin: '1em',
                    minHeight: '15px',
                    border: '1px dashed grey'
                  }}>{subMenu}</ul>
                </li>
            );
          })}
        </ul>
    );
  };

  render() {
    const menuItems = this.state.menu;
    return (
        <div ref="sortable" id="sortableMenu">
          {this.drawMenu(menuItems)}
        </div>
    );
  }
}