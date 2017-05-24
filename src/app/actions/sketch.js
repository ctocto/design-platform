import { createActions } from 'redux-actions';
import {
  SKETCH_DIMENSION_UPDATE,
  SKETCH_SET_ACTIVE_COMPONENT,
  SKETCH_SET_FOCUS_COMPONENT,
  SKETCH_START_DRAGGING,
  SKETCH_STOP_DRAGGING,
} from './actionTypes';

export const {
  sketchDimensionUpdate: updateSketchDimension,
  sketchSetActiveComponent: setActiveComponent,
  sketchSetFocusComponent: setFocusComponent,
  sketchStartDragging: startDragging,
  sketchStopDragging: stopDragging,
} = createActions(
  SKETCH_DIMENSION_UPDATE,
  SKETCH_SET_ACTIVE_COMPONENT,
  SKETCH_SET_FOCUS_COMPONENT,
  SKETCH_START_DRAGGING,
  SKETCH_STOP_DRAGGING,
);
