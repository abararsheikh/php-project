import AppDispatcher from '../dispatcher/AppDispatcher';
import RegisterConstants from '../constants/RegisterConstants';

export default {
  validateUsername : (username) => {
    AppDispatcher.dispatch({
      actionType: RegisterConstants.VALIDATE_USERNAME,
      username
    })
  },
  validatePassword: (password) => {
    AppDispatcher.dispatch({
      actionType: RegisterConstants.VALIDATE_PASSWORD,
      password
    })
  },
  validateRepeatPassword: (repeatPassword, compareValue) => {
    AppDispatcher.dispatch({
      actionType: RegisterConstants.VALIDATE_REPEAT_PASSWORD,
      repeatPassword,
      compareValue
    })
  },
  validateEmail: (email) => {
    AppDispatcher.dispatch({
      actionType: RegisterConstants.VALIDATE_EMAIL,
      email
    })
  },
  registerUser: (fields) => {
    AppDispatcher.dispatch({
      actionType: RegisterConstants.SUBMIT,
      fields
    })
  }
}