import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import MenuConstants from '../constants/MenuConstants';

const CHANGE_EVENT = 'change';


class MenuStore extends EventEmitter {
  _menu;

  constructor() {
    super();
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
      case MenuConstants.GET_MENU:
        this._menu = JSON.parse(action.menu[0].menu)[0].menu;
        this._menu[5] = [{name: 'test'}];
        console.log(this._menu);
        this.emitChange();

    }
  }
}

export default new MenuStore();