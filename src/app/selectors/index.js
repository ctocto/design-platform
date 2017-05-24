import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import assign from 'lodash/assign';
import get from 'lodash/get';
import { appSchema } from '../schema/';

const getNormalizedSchema = state => state.schema;
const getActiveComponent = state => state.canvasStatus.activeComponent;
const getFocusComponent = state => state.canvasStatus.focusComponent;

export const selectSchema = createSelector(
  [getNormalizedSchema],
  schema => denormalize(schema.result, appSchema, schema.entities),
);

export const selectAllComponents = createSelector(
  [getNormalizedSchema],
  normalizedSchema => get(normalizedSchema, 'entities.components', {}),
);

export const selectActiveComponent = createSelector(
  [getNormalizedSchema, getActiveComponent],
  (normalizedSchema, id) => {
    const res = {};
    if (id) {
      const entity = get(normalizedSchema, `entities.components.${id}`);
      assign(res, {
        id,
        props: entity.props,
        component: entity.component,
      });
      if (normalizedSchema.result.includes(id)) {
        assign(res, {
          pid: null,
          index: normalizedSchema.result.indexOf(id),
        });
      } else {
        Object.keys(normalizedSchema.entities.components).some((pid) => {
          if (pid !== id) {
            if (normalizedSchema.entities.components[pid].children.includes[id]) {
              assign(res, {
                pid,
                index: normalizedSchema.entities.components[pid].children.indexOf(id),
              });
              return true;
            }
          }
        });
      }
    }
    return res;
  },
);

export const selectFocusComponent = createSelector(
  [getNormalizedSchema, getFocusComponent],
  (normalizedSchema, id) => {
    const res = {
      id,
    };
    if (id) {
      if (normalizedSchema.result.includes(id)) {
        assign(res, {
          pid: null,
          index: normalizedSchema.result.indexOf(id),
        });
      } else {
        Object.keys(normalizedSchema.entities.components).some((pid) => {
          if (pid !== id) {
            if (normalizedSchema.entities.components[pid].children.includes(id)) {
              assign(res, {
                pid,
                index: normalizedSchema.entities.components[pid].children.indexOf(id),
              });
              return true;
            }
          }
        });
      }
    }
    return res;
  },
);
