import assign from 'lodash/assign';
import { START_DRAG_PICKER, FINISH_DRAG_PICKER, UPDATE_PICKER_POSITION } from '../actions/actionTypes';

function selectPicker(state = {
  picker: null,
  offsetPos: null,
}, action) {
  switch (action.type) {
    case START_DRAG_PICKER:
      return assign({}, action.payload);
    case FINISH_DRAG_PICKER:
      return assign({}, {
        picker: null,
        offsetPos: null,
      });
    default:
      return state;
  }
}

function dragPicker(state = {}, action) {
  switch (action.type) {
    case UPDATE_PICKER_POSITION:
      return assign({}, action.payload);
    default:
      return state;
  }
}

export {
  selectPicker,
  dragPicker,
};
