import { combineReducers } from 'redux';
import { dimension, status } from './canvas';
import { schema } from './schema';

const appReducer = combineReducers({
  canvasDimension: dimension,
  canvasStatus: status,
  schema,
});

export default appReducer;
