import AppDispatch from '../dispatcher/AppDispatcher';
import RegisterConstants from '../constants/RegisterConstants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let validateUsername = (username) => {
  console.log('validate username');
  let valid = false;
  let error = [];
  if(username.length < 3) error.push('length must be greater than 3');
  return {valid, error};
};

class RegisterStore extends EventEmitter {

  constructor() {
    super();
    AppDispatch.register(this._register);
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

  _register = (action) => {
    switch (action.actionType) {
      case RegisterConstants.VALIDATE_USERNAME:
        validateUsername(action.username);
        this.emitChange();
        break;
    }
  }
}

export default new RegisterStore();