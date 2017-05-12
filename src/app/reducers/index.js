import { combineReducers } from 'redux';
import { canvasDimension } from './canvas';

const appReducer = combineReducers({
  canvasDimension,
});

export default appReducer;
