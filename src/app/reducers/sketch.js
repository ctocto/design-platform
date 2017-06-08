import Immutable from 'seamless-immutable';
import {
  SKETCH_SET_ACTIVE_COMPONENT,
} from '../actions/actionTypes';

export default function status(state = Immutable({
  activeComponent: null,
}), action) {
  const { payload } = action;
  switch (action.type) {
    case SKETCH_SET_ACTIVE_COMPONENT:
      return state.merge({
        activeComponent: payload,
      });
    default:
      return state;
  }
}
