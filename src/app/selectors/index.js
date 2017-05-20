import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { appSchema } from '../schema/';

const getNormalizedSchema = state => state.schema;
const getActiveComponents = state => state.canvasStatus.activeComponents;

export const selectSchema = createSelector(
  [getNormalizedSchema],
  schema => denormalize(schema.result, appSchema, schema.entities),
);

export const selectActiveComponentsIndex = createSelector(
  [getNormalizedSchema, getActiveComponents],
  (normalizedSchema, activeComponents) => {
    const res = {};
    activeComponents.forEach((id) => {
      if (normalizedSchema.result.includes(id)) {
        res[id] = {
          pid: null,
          index: normalizedSchema.result.indexOf(id),
        };
      } else {
        Object.keys(normalizedSchema.entities.components).some((pid) => {
          if (pid !== id) {
            if (normalizedSchema.entities.components[pid].children.includes[id]) {
              res[id] = {
                pid,
                index: normalizedSchema.entities.components[pid].children.indexOf(id),
              };
              return true;
            }
          }
        });
      }
    });
    return res;
  },
);
