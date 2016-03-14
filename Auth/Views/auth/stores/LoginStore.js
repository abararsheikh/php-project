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
  _username = '';

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
      isLoggedIn: this._isLoggedIn,
      username: this._username
    };
  }

  _register = (action) => {
    switch (action.actionType) {
      case LoginConstants.LOGIN_LOGIN:
        submitLogin(action.username, action.password)
            .then(data => {
              this._error = data.error[0];
              this._isLoggedIn = data.success;
              this.emitChange();
            });
        break;
      case LoginConstants.GET_LOGIN:
        $.get('/Auth/getLogin').then(data=> {
          console.log(data);
          if(data.success){
            this._isLoggedIn = true;
            this._username = data.username;
          }
          this.emitChange();
        });
        break;

      default:
        return;
    }
  }
}

export default new LoginStore();
