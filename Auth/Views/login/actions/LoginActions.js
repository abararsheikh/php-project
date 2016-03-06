import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';

var LoginActions = {
  submitLogin: (username, password) => {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_LOGIN,
      username,
      password
    })
  }
};

export default LoginActions;