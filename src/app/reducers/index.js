import { combineReducers } from 'redux';
import { dimension, status } from './sketch';
import { schema } from './schema';

const appReducer = combineReducers({
  sketchDimension: dimension,
  sketchStatus: status,
  schema,
});

export default appReducer;
