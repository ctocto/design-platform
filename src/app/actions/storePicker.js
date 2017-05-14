import { START_DRAG_PICKER, FINISH_DRAG_PICKER, UPDATE_PICKER_POSITION } from './actionTypes';

export function startDragPicker(payload) {
  return {
    type: START_DRAG_PICKER,
    payload,
  };
}

export function finishDragPicker(payload) {
  return {
    type: FINISH_DRAG_PICKER,
    payload,
  };
}

export function updatePickerPosition(payload) {
  return {
    type: UPDATE_PICKER_POSITION,
    payload,
  };
}
