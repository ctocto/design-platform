import { createActions } from 'redux-actions';

import { SET_DEVICE } from './actionTypes';

export const {
  setDevice,
} = createActions(
  SET_DEVICE,
);
