import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';


export default {
  submitLogin: (username, password) => {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_LOGIN,
      username,
      password
    })
  },
  getLogin: () => {
    AppDispatcher.dispatch({
      actionType: LoginConstants.GET_LOGIN
    })
  }
};