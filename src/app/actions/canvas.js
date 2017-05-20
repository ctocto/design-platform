import { createActions } from 'redux-actions';
import {
  CANVAS_DIMENSION_UPDATE,
  CANVAS_ADD_ACTIVE_COMPONENT,
  CANVAS_REMOVE_ACTIVE_COMPONENT,
  CANVAS_START_DRAGGING,
  CANVAS_STOP_DRAGGING,
} from './actionTypes';

export const {
  canvasDimensionUpdate: updateCanvasDimension,
  canvasAddActiveComponent: addActiveComponent,
  canvasRemoveActiveComponent: removeActiveComponent,
  canvasStartDragging: startDragging,
  canvasStopDragging: stopDragging,
} = createActions(
  CANVAS_DIMENSION_UPDATE,
  CANVAS_ADD_ACTIVE_COMPONENT,
  CANVAS_REMOVE_ACTIVE_COMPONENT,
  CANVAS_START_DRAGGING,
  CANVAS_STOP_DRAGGING,
);
