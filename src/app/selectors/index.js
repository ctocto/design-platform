import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import assign from 'lodash/assign';
import { appSchema } from '../schema/';

const getNormalizedSchema = state => state.schema;
// const getActiveComponent = state => state.canvasStatus.activeComponent;
const getFocusComponent = state => state.canvasStatus.focusComponent;

export const selectSchema = createSelector(
  [getNormalizedSchema],
  schema => denormalize(schema.result, appSchema, schema.entities),
);

// export const selectActiveComponents = createSelector(
//   [getNormalizedSchema, getActiveComponents],
//   (normalizedSchema, activeComponents) => {
//     const res = [];
//     activeComponents.forEach((id) => {
//       if (normalizedSchema.result.includes(id)) {
//         res.push({
//           id,
//           pid: null,
//           index: normalizedSchema.result.indexOf(id),
//         });
//       } else {
//         Object.keys(normalizedSchema.entities.components).some((pid) => {
//           if (pid !== id) {
//             if (normalizedSchema.entities.components[pid].children.includes[id]) {
//               res.push({
//                 id,
//                 pid,
//                 index: normalizedSchema.entities.components[pid].children.indexOf(id),
//               });
//               return true;
//             }
//           }
//         });
//       }
//     });
//     return res;
//   },
// );

export const selectFocusComponent = createSelector(
  [getNormalizedSchema, getFocusComponent],
  (normalizedSchema, id) => {
    const res = {};
    if (id) {
      if (normalizedSchema.result.includes(id)) {
        assign(res, {
          id,
          pid: null,
          index: normalizedSchema.result.indexOf(id),
        });
      } else {
        Object.keys(normalizedSchema.entities.components).some((pid) => {
          if (pid !== id) {
            if (normalizedSchema.entities.components[pid].children.includes[id]) {
              assign(res, {
                id,
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
