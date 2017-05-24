import { createActions } from 'redux-actions';
import {
  CANVAS_DIMENSION_UPDATE,
  CANVAS_SET_ACTIVE_COMPONENT,
  CANVAS_SET_FOCUS_COMPONENT,
  CANVAS_START_DRAGGING,
  CANVAS_STOP_DRAGGING,
} from './actionTypes';

export const {
  canvasDimensionUpdate: updateCanvasDimension,
  canvasSetActiveComponent: setActiveComponent,
  canvasSetFocusComponent: setFocusComponent,
  canvasStartDragging: startDragging,
  canvasStopDragging: stopDragging,
} = createActions(
  CANVAS_DIMENSION_UPDATE,
  CANVAS_SET_ACTIVE_COMPONENT,
  CANVAS_SET_FOCUS_COMPONENT,
  CANVAS_START_DRAGGING,
  CANVAS_STOP_DRAGGING,
);
