import assign from 'lodash/assign';
import without from 'lodash/without';
import {
  CANVAS_DIMENSION_UPDATE,
  CANVAS_ADD_ACTIVE_COMPONENT,
  CANVAS_REMOVE_ACTIVE_COMPONENT,
  CANVAS_ADD_FOCUS_COMPONENT,
  CANVAS_REMOVE_FOCUS_COMPONENT,
  CANVAS_START_DRAGGING,
  CANVAS_STOP_DRAGGING,
} from '../actions/actionTypes';

function dimension(state = {}, action) {
  switch (action.type) {
    case CANVAS_DIMENSION_UPDATE:
      return assign({}, action.payload);
    default:
      return state;
  }
}

function status(state = {
  activeComponent: null,
  focusComponent: null,
  dragging: false,
}, action) {
  // let activeComponents;
  switch (action.type) {
    case CANVAS_ADD_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponent: action.payload,
      };
    case CANVAS_REMOVE_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponent: null,
      };
    case CANVAS_ADD_FOCUS_COMPONENT:
      return {
        ...state,
        focusComponent: action.payload,
      };
    case CANVAS_REMOVE_FOCUS_COMPONENT:
      return {
        ...state,
        focusComponent: null,
      };
    case CANVAS_START_DRAGGING:
      return {
        ...state,
        dragging: true,
      };
    case CANVAS_STOP_DRAGGING:
      return {
        ...state,
        dragging: false,
      };
    default:
      return state;
  }
}

export {
  dimension,
  status,
};
