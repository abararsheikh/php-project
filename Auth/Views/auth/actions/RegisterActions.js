import AppDispatcher from '../dispatcher/AppDispatcher';
import RegisterConstants from '../constants/RegisterConstants';

export default {
  validateUsername : (username) => {
    AppDispatcher.dispatch({
      actionType: RegisterConstants.VALIDATE_USERNAME,
      username: username
    })
  }
}