import AppDispatcher from '../dispatcher/AppDispatcher';
import MenuConstants from '../constants/MenuConstants';
import * as Api from '../api';

export default {
  saveMenu: (menu) => {
    Api.saveMenu(menu).then( res => {
      AppDispatcher.dispatch({
        actionType: MenuConstants.SAVE,
        response: res
      })
    })
  },
  getMenu: () => {
    Api.getMenu().then( data => {
      AppDispatcher.dispatch({
        actionType: MenuConstants.GET_MENU,
        menu: data
      })
    });
  }
}
