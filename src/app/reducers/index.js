import { combineReducers } from 'redux';
import sketch from './sketch';
import { schema } from './schema';
import device from './device';

const appReducer = combineReducers({
  sketch,
  schema,
  device,
});

export default appReducer;
