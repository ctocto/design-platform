import Immutable from 'seamless-immutable';
import {
  SET_DEVICE,
} from '../actions/actionTypes';
import { DEFAULT_DEVICE } from '../constants';

export default function device(state = Immutable({
  name: DEFAULT_DEVICE,
}), action) {
  switch (action.type) {
    case SET_DEVICE:
      return state.set('name', action.payload);
    default:
      return state;
  }
}
