import React from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    console.log('begin drag');
    return {
      id: props.id,
      link: props.link,
      name: props.name
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const targetItem = props;
    const sourceItem = monitor.getItem();
    const findItem = props.findItem;

    const sourceIndex = findItem(['id', sourceItem.id]).index;
    const targetIndex = findItem(['id', targetItem.id]).index;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    const xRange = hoverBoundingRect.width * .1;
    const movedX = monitor.getDifferenceFromInitialOffset().x;


    if (movedX > xRange) {
      console.log('right');
    }
    if (-movedX > xRange) {
      props.moveItem('left', sourceItem, targetItem);
      // props.moved=false;
      console.log('left');
      return;
    }

    if (targetItem === sourceItem) return;

    // Dragging downwards
    if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) {
      props.moveItem('down', sourceItem, targetItem);
    }
    // Dragging upwards
    if (sourceIndex > targetIndex && hoverClientY > hoverMiddleY) {
      props.moveItem('up', sourceItem, targetItem);
    }
    // console.log(monitor.getItem());
  }
};

@DropTarget('menuItem', itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('menuItem', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}))
export default class MenuItem extends React.Component {

  render() {
    const {name, id, connectDragSource, connectDropTarget} = this.props;
    return connectDragSource(connectDropTarget(
        <p style={{border: '1px solid black', padding: '1em'}}>{id}: {name}</p>
    ))
  }
}