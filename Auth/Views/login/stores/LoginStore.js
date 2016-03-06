import LoginConstants from '../constants/LoginConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var testMessage = 'testtest';

//submitLogin
class LoginStore extends EventEmitter {
  constructor() {
    super();
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

  getAll() {
    console.log('get all');
    return [1, 2, 3];
  }

}

let store = new LoginStore();


AppDispatcher.register((payload) => {
  switch (payload.actionType) {
    case LoginConstants.LOGIN_LOGIN:

      break;

    default: return;

  }
  store.emitChange();
});

export default store;