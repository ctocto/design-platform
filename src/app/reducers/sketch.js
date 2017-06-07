import Immutable from 'seamless-immutable';
import {
  SKETCH_SET_ACTIVE_COMPONENT,
  SKETCH_SET_FOCUS_COMPONENT,
  SKETCH_MOUSE_IN,
  SKETCH_MOUSE_OUT,
} from '../actions/actionTypes';

export default function status(state = Immutable({
  activeComponent: null,
  focusComponent: null,
  focusType: 'APPEND',
  mouseIn: false,
}), action) {
  const { payload } = action;
  switch (action.type) {
    case SKETCH_SET_ACTIVE_COMPONENT:
      return state.merge({
        activeComponent: payload,
      });
    case SKETCH_SET_FOCUS_COMPONENT:
      return state.merge({
        focusComponent: payload.component,
        focusType: payload.type,
      });
    case SKETCH_MOUSE_IN:
      return state.set('mouseIn', true);
    case SKETCH_MOUSE_OUT:
      return state
        .set('mouseIn', false)
        .set('focusComponent', null);
    default:
      return state;
  }
}
