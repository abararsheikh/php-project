import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {
  changeView: (viewName) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_VIEW,
      viewName,
    })
  }
}