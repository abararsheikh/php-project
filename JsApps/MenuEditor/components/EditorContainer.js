import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MenuItem from './MenuItem';

Array.prototype.deepSplice = function (indexArray, deleteCount, ...replacement) {
  if (!indexArray) return;
  return indexArray.reduce((acc, currentIndex, i) => {
    if (i !== indexArray.length - 1) return acc[currentIndex];
    return acc.splice(currentIndex, deleteCount, ...replacement);
  }, this)
};

@DragDropContext(HTML5Backend)
export default class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {id: 1, name: 'home', link: '/home'},
        {id: 2, name: 'news', link: '/news'},
        [
          {id: 3, name: 'sub1', link: '/sub1'},
          [
            {id: 6, name: 'sub2', link: '/sub1'}
          ],
          {id: 4, name: 'sub1', link: '/sub2'}
        ],
        {id: 5, name: 'blog', link: '/blog'}
      ]
    }
  }

  drawMenu = (menuItems, baseIndex = '0') => {
    return (
        <ul key={baseIndex}>
          {menuItems.map((item, index) => {
            if ($.isArray(item)) return this.drawMenu(item, index);
            return (
                <li key={baseIndex + index.toString()}>
                  <MenuItem  {...item}
                      findItem={this.findItem}
                      moveItem={this.moveItem}/>
                </li>
            );
          })}
        </ul>
    );
  };

  findItem = (keyValuePair, sourceArray = this.state.menu, indexArray = []) => {
    return sourceArray.reduce((acc, arrayItem, index) => {
      if ($.isArray(arrayItem)) acc = this.findItem(keyValuePair, arrayItem, indexArray.concat(index)) || acc;
      const [key, value] = [...keyValuePair];
      if (arrayItem[key] === value) {
        acc = {item: arrayItem, index: indexArray.concat(index)};
      }
      return acc;
    }, false)
  };

  moveItem = (direction, sourceItem, targetItem, arraySource = this.state.menu) => {
    const sourceIndex = this.findItem(['id', sourceItem.id]).index;
    // Delete source item at old place
    // arraySource.deepSplice(sourceIndex, 1);
    // const targetIndex = this.findItem(['id', targetItem.id]).index;

    // console.log(targetIndex);
    if (direction === 'up') {
      arraySource.deepSplice(sourceIndex, 1);
      const targetIndex = this.findItem(['id', targetItem.id]).index;
      arraySource.deepSplice(targetIndex, 0, sourceItem);
    }
    if (direction === 'down') {
      arraySource.deepSplice(sourceIndex, 1);
      const targetIndex = this.findItem(['id', targetItem.id]).index;
      arraySource.deepSplice(targetIndex, 1, targetItem, sourceItem);
    }
    if (direction === 'left' && sourceIndex && sourceIndex.length > 1) {
      arraySource.deepSplice(sourceIndex, 1);
      const i = sourceIndex.slice(0, sourceIndex.length - 1);
      arraySource.deepSplice(i, 0, sourceItem);
    }
    if (direction === 'right' && sourceIndex && sourceIndex.length > 1) {
      arraySource.deepSplice(sourceIndex, 1);
      const i = sourceIndex.slice(0, sourceIndex.length - 1);
      arraySource.deepSplice(i, 0, sourceItem);
    }

    this.setState({menu: arraySource});
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