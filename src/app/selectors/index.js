import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { appSchema } from '../schema/';

const getPickerPosition = state => state.pickerPosition;
const getCurrentPickerOriginPos = state => state.currentPicker.originPos;
const getCanvasDimension = state => state.canvasDimension;

export const isPickerOnCanvas = createSelector(
  [getPickerPosition, getCurrentPickerOriginPos, getCanvasDimension],
  (pickerPosition, originPos, canvasDimension) => {
    if (!(pickerPosition && originPos)) return false;
    if ((originPos.bottom + pickerPosition.y >= canvasDimension.top)
      && (originPos.top + pickerPosition.y <= canvasDimension.bottom)) {
      if ((originPos.right + pickerPosition.x >= canvasDimension.left)
      && (originPos.left + pickerPosition.x <= canvasDimension.right)) {
        return true;
      }
    }
    return false;
  },
);

const getSchema = state => state.schema;

export const selectSchema = createSelector(
  [getSchema],
  schema => denormalize(schema.result, appSchema, schema.entities),
);
