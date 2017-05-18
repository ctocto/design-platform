import { createActions } from 'redux-actions';
import { START_DRAG_PICKER, FINISH_DRAG_PICKER, UPDATE_PICKER_POSITION } from './actionTypes';

export const {
  startDragPicker,
  finishDragPicker,
  updatePickerPosition,
} = createActions(
  START_DRAG_PICKER,
  FINISH_DRAG_PICKER,
  UPDATE_PICKER_POSITION,
);
