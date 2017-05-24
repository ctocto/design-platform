import assign from 'lodash/assign';
import {
  SKETCH_DIMENSION_UPDATE,
  SKETCH_SET_ACTIVE_COMPONENT,
  SKETCH_SET_FOCUS_COMPONENT,
  SKETCH_START_DRAGGING,
  SKETCH_STOP_DRAGGING,
} from '../actions/actionTypes';

function dimension(state = {}, action) {
  switch (action.type) {
    case SKETCH_DIMENSION_UPDATE:
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
    case SKETCH_SET_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponent: payload,
      };
    case SKETCH_SET_FOCUS_COMPONENT:
      return {
        ...state,
        focusComponent: payload.component,
        focusType: payload.type,
      };
    case SKETCH_START_DRAGGING:
      return {
        ...state,
        dragging: true,
      };
    case SKETCH_STOP_DRAGGING:
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
