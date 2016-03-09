import AppDispatch from '../dispatcher/AppDispatcher';
import RegisterConstants from '../constants/RegisterConstants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let validateUsername = (username) => {
  if (username.length < 3) return 'length should be greater than 3';
};
let validatePassword = (passowrd) => {
  if (passowrd.length < 3) return 'length should be greater than 3';
};
let validateRepeatPassword = (pass1, pass2) => {
  if (pass1 !== pass2) return 'two passwords do not match';
};
let validateEmail = (email) => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!regex.test(email)) return 'invalid email';
};

function InputField() {
  return { value: '', isDirty: false };
}

class RegisterStore extends EventEmitter {

  constructor() {
    super();
    this.fields = {
      username: new InputField(),
      password: new InputField(),
      repeatPassword: new InputField(),
      email: new InputField()
    };
    AppDispatch.register(this._register);
  }

  getForm() {
    return this.fields;
  }
  updateField = (fieldName, props) => {
    this.fields[fieldName].value = props.value;
    this.fields[fieldName].isDirty = props.isDirty;
  };

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
      case RegisterConstants.UPDATE_FIELD:

      case RegisterConstants.VALIDATE_USERNAME:
        this.fields.username.error = this.fields.username.isDirty ?
            validateUsername(action.username) : '';
        this.emitChange();
        break;

      case RegisterConstants.VALIDATE_PASSWORD:
        this.fields.password.error = this.fields.password.isDirty ?
            validatePassword(action.password) : '';
        this.emitChange();
        break;

      case RegisterConstants.VALIDATE_REPEAT_PASSWORD:
        this.fields.repeatPassword.error = this.fields.repeatPassword.isDirty ?
            validateRepeatPassword(this.fields.password.value, action.repeatPassword) : '';
        this.emitChange();
        break;
      case RegisterConstants.VALIDATE_EMAIL:
        this.fields.email.error = this.fields.email.isDirty ?
            validateEmail(action.email) : '';
        this.emitChange();
        break;

      default:
        return false;
    }
  }
}

export default new RegisterStore();