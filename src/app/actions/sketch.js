import { createActions } from 'redux-actions';
import {
  SKETCH_SET_ACTIVE_COMPONENT,
} from './actionTypes';

export const {
  sketchSetActiveComponent: setActiveComponent,
} = createActions(
  SKETCH_SET_ACTIVE_COMPONENT,
);
