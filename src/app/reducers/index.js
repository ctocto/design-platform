import { combineReducers } from 'redux';
import { canvasDimension } from './canvas';
import { selectPicker, dragPicker } from './picker';

const appReducer = combineReducers({
  canvasDimension,
  currentPicker: selectPicker,
  pickerPosition: dragPicker,
});

export default appReducer;
