import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import AppConstant from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

class AppStore extends EventEmitter{
  _currentView;

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

  getCurrentView() {
    return this._currentView;
  }

  _register = (action) => {
    switch (action.actionType) {
      case AppConstant.CHANGE_VIEW:
        this._currentView = action.viewName;
        this.emitChange();
        break;
    }
  }
}

export default new AppStore();
