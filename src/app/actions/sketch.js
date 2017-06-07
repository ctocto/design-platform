import { createActions } from 'redux-actions';
import {
  SKETCH_SET_ACTIVE_COMPONENT,
  SKETCH_SET_FOCUS_COMPONENT,
  SKETCH_MOUSE_IN,
  SKETCH_MOUSE_OUT,
} from './actionTypes';

export const {
  sketchSetActiveComponent: setActiveComponent,
  sketchSetFocusComponent: setFocusComponent,
  sketchMouseIn: setMouseIn,
  sketchMouseOut: setMouseOut,
} = createActions(
  SKETCH_SET_ACTIVE_COMPONENT,
  SKETCH_SET_FOCUS_COMPONENT,
  SKETCH_MOUSE_IN,
  SKETCH_MOUSE_OUT,
);
