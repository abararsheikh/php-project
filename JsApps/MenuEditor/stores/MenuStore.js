import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import MenuConstants from '../constants/MenuConstants';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css!';

const CHANGE_EVENT = 'change';


class MenuStore extends EventEmitter {
  _state = {
    menu: [],
    num: 0,
    toastr: false
  };

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

  getState() {
    return this._state;
  }

  ///////////

  _register = (action) => {
    switch (action.actionType) {
      case MenuConstants.GET_MENU:
        this._state.menu = action.menu.map(m => ({name: m.name, menu: JSON.parse(m.menu)}));
        console.log(this._state.menu);
        this.emitChange();
        break;
      case MenuConstants.SAVE:
        if (action.response.success) {
          this._state.toastr = () => toastr.success('Menu Saved');
        } else {
          this._state.toastr = () => toastr.error('Failed to save');
        }
        this.emitChange();
        this._state.toastr = false;
        break;
      case MenuConstants.UPDATE:
        this._state.menu = action.menu;
        this.emitChange();
        break;
      case MenuConstants.SWITCH:
        this._state.num = action.menuNum;
        this.emitChange();
        break;
    }
  }
}

export default new MenuStore();