import AppDispatcher from '../dispatcher/AppDispatcher';
import MenuConstants from '../constants/MenuConstants';
import * as Api from '../api';

export default {
  moveUp: (menu) => {
    AppDispatcher.dispatch({
      actionType: MenuConstants.SAVE,
      menu
    })
  },
  getMenu: () => {
    Api.getMenu().then( data => {
      console.log(data);
      AppDispatcher.dispatch({
        actionType: MenuConstants.GET_MENU,
        menu: data
      })
    });
  }
}
