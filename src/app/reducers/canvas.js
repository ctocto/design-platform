import assign from 'lodash/assign';
import {
  CANVAS_DIMENSION_UPDATE,
  CANVAS_SET_ACTIVE_COMPONENT,
  CANVAS_SET_FOCUS_COMPONENT,
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
  focusType: 'APPEND',
  dragging: false,
}, action) {
  const { payload } = action;
  switch (action.type) {
    case CANVAS_SET_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponent: payload,
      };
    case CANVAS_SET_FOCUS_COMPONENT:
      return {
        ...state,
        focusComponent: payload.component,
        focusType: payload.type,
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
