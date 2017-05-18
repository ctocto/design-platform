import { combineReducers } from 'redux';
import { dimension } from './canvas';
import { selectPicker, dragPicker } from './picker';
import { schema } from './schema';

const appReducer = combineReducers({
  canvasDimension: dimension,
  currentPicker: selectPicker,
  pickerPosition: dragPicker,
  schema,
});

export default appReducer;
