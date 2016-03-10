import AppDispatch from '../dispatcher/AppDispatcher';
import RegisterConstants from '../constants/RegisterConstants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let validateUsername = (username) => {
  if (!username.isDirty) return username;
  username.error = (username.value.length < 3) ? 'length should be greater than 3' : '';
  return username;
};
let validatePassword = (passowrd) => {
  if (!passowrd.isDirty) return passowrd;
  passowrd.error = (passowrd.value.length < 3) ? 'length should be greater than 3' : '';
  return passowrd;
};
let validateRepeatPassword = (password, compareValue) => {
  password.error = (password.value !== compareValue) ? 'two passwords do not match' : '';
  return password;
};
let validateEmail = (email) => {
  if (!email.isDirty) return email;
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email.error = (!regex.test(email.value)) ? 'invalid email' : '';

  return email;
};
let registerUser = (fields) => {
  let userInfo = {
    username: fields.username.value,
    password: fields.password.value,
    email: fields.email.value
  };
  return $.ajax({
    method: 'POST',
    url: '/Auth/register',
    data: userInfo
  });
};

function InputField() {
  return { value: '', isDirty: false, error: '' };
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
  allValid() {
    for (let key in this.fields) {
      if(!this.fields[key].isDirty) return false;
      if(this.fields[key].error.length !== 0) return false;
    }
    return true;
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
      case RegisterConstants.VALIDATE_USERNAME:
        this.fields.username = validateUsername(action.username);
        this.emitChange();
        break;

      case RegisterConstants.VALIDATE_PASSWORD:
        this.fields.password = validatePassword(action.password);
        this.emitChange();
        break;

      case RegisterConstants.VALIDATE_REPEAT_PASSWORD:
        this.fields.repeatPassword = validateRepeatPassword(action.repeatPassword, action.compareValue);
        this.emitChange();
        break;
      case RegisterConstants.VALIDATE_EMAIL:
        this.fields.email = validateEmail(action.email);
        this.emitChange();
        break;
      case RegisterConstants.SUBMIT:
        registerUser(action.fields).then((data) => {
          console.log(data);
          this.emitChange();
        });
        break;

      default:
        return false;
    }
  }
}

export default new RegisterStore();