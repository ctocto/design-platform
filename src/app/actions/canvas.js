import { CANVAS_DIMENSION_UPDATE } from './actionTypes';

export function updateCanvasDimension(payload) {
  return {
    type: CANVAS_DIMENSION_UPDATE,
    payload,
  };
}
