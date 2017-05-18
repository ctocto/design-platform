import { createAction } from 'redux-actions';
import { CANVAS_DIMENSION_UPDATE } from './actionTypes';

export const updateCanvasDimension = createAction(CANVAS_DIMENSION_UPDATE);
