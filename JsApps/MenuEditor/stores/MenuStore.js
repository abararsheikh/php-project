import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import MenuConstants from '../constants/MenuConstants';
import _ from 'lodash';

const CHANGE_EVENT = 'change';
Array.prototype.deepSplice = function (indexArray, deleteCount, ...replacement) {
  if (!indexArray) return;
  return indexArray.reduce((acc, currentIndex, i) => {
    if (i !== indexArray.length - 1) return acc[currentIndex];
    return acc.splice(currentIndex, deleteCount, ...replacement);
  }, this)
};

class MenuStore extends EventEmitter {
  _menu;

  constructor() {
    super();
    this._menu = [
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
    ];

    AppDispatcher.register(this._register);
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getMenu() {
    return this._menu;
  }

  findItem = (keyValuePair, sourceArray = this._menu, indexArray = []) => {
    return sourceArray.reduce((acc, arrayItem, index) => {
      if (_.isArray(arrayItem)) acc = this.findItem(keyValuePair, arrayItem, indexArray.concat(index)) || acc;
      const [key, value] = [...keyValuePair];
      if (arrayItem[key] === value) {
        acc = {item: arrayItem, index: indexArray.concat(index)};
      }
      return acc;
    }, false)
  };

  //////////////////

  _findSubMenu = (indexArray, sourceArray) => {
    let subMenuIndex = [].concat(indexArray);
    subMenuIndex[subMenuIndex.length - 1] = subMenuIndex[subMenuIndex.length - 1] + 1;
    return _.get(sourceArray, subMenuIndex);
  };

  _moveUp = (sourceItem, targetItem, sourceArray) => {
    const sourceIndex = this.findItem(['id', sourceItem.id], sourceArray).index;
    let targetIndex = this.findItem(['id', targetItem.id], sourceArray).index;
    if (sourceIndex.length !== targetIndex.length) return sourceArray;

    const subMenu = this._findSubMenu(sourceIndex, sourceArray);
    const [sliceCount, replaceItem] = _.isArray(subMenu) ? [2, [sourceItem, subMenu]] : [1, [sourceItem]];
    sourceArray.deepSplice(sourceIndex, sliceCount);
    targetIndex = this.findItem(['id', targetItem.id]).index;
    Array.prototype.deepSplice.apply(sourceArray, [targetIndex, 0, ...replaceItem]);

    return sourceArray;
  };
  _moveDown = (sourceItem, targetItem, sourceArray) => {
    const sourceIndex = this.findItem(['id', sourceItem.id], sourceArray).index;
    let targetIndex = this.findItem(['id', targetItem.id], sourceArray).index;
    // only same level operation
    if (sourceIndex.length !== targetIndex.length) return sourceArray;
    // if target has submenu, avoid replacing the item.
    if (_.isArray(this._findSubMenu(targetIndex, sourceArray))) return sourceArray;

    const subMenu = this._findSubMenu(sourceIndex, sourceArray);
    const [sliceCount, replaceItem] = _.isArray(subMenu) ? [2, [targetItem, sourceItem, subMenu]] : [1, [targetItem, sourceItem]];
    sourceArray.deepSplice(sourceIndex, sliceCount);
    targetIndex = this.findItem(['id', targetItem.id]).index;
    Array.prototype.deepSplice.apply(sourceArray, [targetIndex, 1, ...replaceItem]);

    return sourceArray;
  };
  _moveLeft = () => {
    if (direction === 'left' && sourceIndex && sourceIndex.length > 1) {
      arraySource.deepSplice(sourceIndex, 1);
      const i = sourceIndex.slice(0,
          sourceIndex.length - 1);
      arraySource.deepSplice(i, 0, sourceItem);
    }
  };
  _moveRight = (sourceItem, targetItem, sourceArray) => {
    const sourceIndex = this.findItem(['id', sourceItem.id], sourceArray).index;

    if (sourceIndex) {
      // find source index
      // if there is item at source index -1, add source item to one level deeper
      const itemIndex = sourceIndex[sourceIndex.length - 1];
      if (itemIndex > 0) {
        sourceArray.deepSplice(sourceIndex, 1);
        // index of previous item
        const prevIndex = [].concat(sourceIndex);
        prevIndex[prevIndex.length - 1] = itemIndex - 1;
        // delete old one
        let prevItem = _.get(sourceArray, prevIndex);
        sourceArray.deepSplice(prevIndex, 1, _.flatten([prevItem, sourceItem]));
        console.log(sourceArray);
      }
    }
    return sourceArray;
  };

  ///////////

  _register = (action) => {
    switch (action.actionType) {
      case MenuConstants.MOVE_UP:
        this._menu = this._moveUp(action.sourceItem, action.targetItem, action.sourceArray);
        this.emitChange();
        break;
      case MenuConstants.MOVE_DOWN:
        this._menu = this._moveDown(action.sourceItem, action.targetItem, action.sourceArray);
        this.emitChange();
        break;
      case MenuConstants.MOVE_LEFT:
        break;
      case MenuConstants.MOVE_RIGHT:
        this._menu = this._moveRight(action.sourceItem, action.targetItem, action.sourceArray);
        this.emitChange();
        break;

    }
  }
}

export default new MenuStore();