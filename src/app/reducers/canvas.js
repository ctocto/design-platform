import assign from 'lodash/assign';
import without from 'lodash/without';
import {
  CANVAS_DIMENSION_UPDATE,
  CANVAS_ADD_ACTIVE_COMPONENT,
  CANVAS_REMOVE_ACTIVE_COMPONENT,
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
  activeComponents: [],
  dragging: false,
}, action) {
  let activeComponents;
  switch (action.type) {
    case CANVAS_ADD_ACTIVE_COMPONENT:
      if (state.activeComponents.includes(action.payload)) {
        activeComponents = [...state.activeComponents];
      } else {
        activeComponents = [...state.activeComponents, action.payload];
      }
      return {
        ...state,
        activeComponents,
      };
    case CANVAS_REMOVE_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponents: without(state.activeComponents, action.payload),
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
