import AppDispatcher from '../dispatcher/AppDispatcher';
import MenuConstants from '../constants/MenuConstants';

export default {
  moveUp(sourceItem, targetItem, sourceArray) {
    AppDispatcher.dispatch({
      actionType: MenuConstants.MOVE_UP,
      sourceItem, targetItem, sourceArray
    })
  },
  moveDown(sourceItem, targetItem, sourceArray) {
    AppDispatcher.dispatch({
      actionType: MenuConstants.MOVE_DOWN,
      sourceItem, targetItem, sourceArray
    })
  },
  moveLeft(sourceItem, targetItem, sourceArray) {
    AppDispatcher.dispatch({
      actionType: MenuConstants.MOVE_LEFT,
      sourceItem, targetItem, sourceArray
    })
  },
  moveRight(sourceItem, targetItem, sourceArray) {
    AppDispatcher.dispatch({
      actionType: MenuConstants.MOVE_RIGHT,
      sourceItem, targetItem, sourceArray
    })
  }
}
