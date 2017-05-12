import assign from 'lodash/assign';
import { CANVAS_DIMENSION_UPDATE } from '../actions/actionTypes';

function canvasDimension(state = {}, action) {
  switch (action.type) {
    case CANVAS_DIMENSION_UPDATE:
      return assign({}, action.payload);
    default:
      return state;
  }
}

export {
  canvasDimension,
};
