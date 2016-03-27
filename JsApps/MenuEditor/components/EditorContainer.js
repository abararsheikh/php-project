import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MenuItem from './MenuItem';
import MenuStore from '../stores/MenuStore';
import MenuActions from '../actions/MenuActions';

@DragDropContext(HTML5Backend)
export default class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: MenuStore.getMenu()
    }
  }

  componentDidMount() {
    MenuStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    MenuStore.removeChangeListener(this._onChange);
  }
  _onChange = () => {
    this.setState(MenuStore.getMenu());
  };

  moveItem = (direction, sourceItem, targetItem, sourceArray = this.state.menu) => {
    if (direction === 'up') MenuActions.moveUp(sourceItem, targetItem, sourceArray);
    if (direction === 'down') MenuActions.moveDown(sourceItem, targetItem, sourceArray);
    if (direction === 'left') MenuActions.moveLeft(sourceItem, targetItem, sourceArray);
    if (direction === 'right') MenuActions.moveRight(sourceItem, targetItem, sourceArray);
  };

  drawMenu = (menuItems, baseIndex = '0') => {
    return (
        <ul key={baseIndex}>
          {menuItems.map((item, index) => {
            if ($.isArray(item)) return this.drawMenu(item, index);
            return (
                <li key={baseIndex + index.toString()}>
                  <MenuItem  {...item}
                      findItem={MenuStore.findItem}
                      moveItem={this.moveItem}/>
                </li>
            );
          })}
        </ul>
    );
  };
  render() {
    const menuItems = this.state.menu;

    return (
        <div>
          {this.drawMenu(menuItems)}
        </div>
    );
  }
}