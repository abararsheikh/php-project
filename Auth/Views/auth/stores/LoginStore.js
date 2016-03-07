import LoginConstants from '../constants/LoginConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let submitLogin = (username, password) => {
  return $.ajax({
    url: '/Auth/login',
    method: 'POST',
    data: {username, password}
  });
};

class LoginStore extends EventEmitter {
  _error = null;
  _isLoggedIn = false;

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
  getLoginState() {
    return {
      error: this._error,
      isLoggedIn: this._isLoggedIn
    };
  }

  _register = (action) => {
    switch (action.actionType) {
      case LoginConstants.LOGIN_LOGIN:
        submitLogin(action.username, action.password)
          .then(data => {
            this._error = data.error;
            this._isLoggedIn = data.success;
            store.emitChange();
          });
        break;

      default: return;
    }

  }
}

let store = new LoginStore();

export default store;