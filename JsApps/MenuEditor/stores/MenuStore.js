import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import MenuConstants from '../constants/MenuConstants';

const CHANGE_EVENT = 'change';


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