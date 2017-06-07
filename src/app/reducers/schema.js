import assign from 'lodash/assign';
import find from 'lodash/find';
import { normalize } from 'normalizr';
import Immutable from 'seamless-immutable';
import {
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
} from '../actions/actionTypes';
import { appSchema } from '../schema/';

const initialState = Immutable(normalize([], appSchema));

const insert = (array, index, value) => {
  if (index === -1) {
    return array.concat([value]);
  }
  return array.slice(0, index).concat([value]).concat(array.slice(index));
};

const insertAfter = (array, target, value) => {
  const index = array.indexOf(target) + 1;
  return array.slice(0, index).concat([value]).concat(array.slice(index));
};

const removeById = (array, id) => {
  const index = array.indexOf(id);
  return array.slice(0, index).concat(array.slice(index + 1));
};

const findParentComponent = (components, id) => find(
  Object.values(components),
  o => o.children.includes(id),
);

const updateSchemaByInsert = (schemaData, tid, id) => {
  let ret;
  if (schemaData.result.includes(tid)) {
    ret = schemaData.update('result', ids => insertAfter(ids, tid, id));
  } else {
    const parentComponent = findParentComponent(schemaData.entities.components, tid);
    ret = schemaData.updateIn(
      ['entities', 'components', parentComponent.id, 'children'],
      ids => insertAfter(ids, tid, id),
    );
  }
  return ret;
};

const findComponent = (id, result, components) => {
  const ret = {
    id,
  };
  if (result.includes(id)) {
    assign(ret, {
      pid: null,
      index: result.indexOf(id),
    });
  } else {
    Object.keys(components).some((cid) => {
      const c = components[cid];
      if (cid !== id) {
        if (c.children.includes(id)) {
          assign(ret, {
            pid: c.id,
            index: c.children.indexOf(id),
          });
          return true;
        }
      }
      return false;
    });
  }
  return ret;
};

function schema(state = initialState, action) {
  const { payload } = action;
  let newState;
  switch (action.type) {
    case SCHEMA_UPDATE_COMPONENT:
      const {
        component,
        type, // ADD or UPDATE
        id,
        props,
        tid, // target id
        AS_CHILD,
      } = payload;
      if (type === 'ADD') {
        // add new component
        const newComp = {
          [id]: {
            id,
            component,
            props,
            children: [],
          },
        };
        if (AS_CHILD) {
          if (tid) {
            newState = state.updateIn(
              ['entities', 'components', tid, 'children'],
              ids => ids.concat([id]),
            );
          } else {
            newState = state.update('result', ids => ids.concat([id]));
          }
        } else {
          newState = updateSchemaByInsert(state, tid, id);
        }
        newState = newState.merge({
          entities: {
            components: newComp,
          },
        }, { deep: true });
      } else if (type === 'UPDATE') {
        // move component
        if (!state.entities.components[id]) {
          return state;
        }
        if (AS_CHILD) {
          let parentComponent = findParentComponent(state.entities.components, id);
          newState = state.updateIn(['entities', 'components', parentComponent.id, 'children'], ids => removeById(ids, id));
          newState = newState.updateIn(
            ['entities', 'components', tid, 'children'],
            ids => ids.concat([id]),
          );
        } else {
          if (state.result.includes(id)) {
            newState = state.update('result', ids => removeById(ids, id));
          } else {
            let parentComponent = findParentComponent(state.entities.components, tid);
            newState = state.updateIn(
              ['entities', 'components', parentComponent.id, 'children'],
              ids => insertAfter(ids, tid, id),
            );
          }
          newState = updateSchemaByInsert(newState, tid, id);
        }
      }
      return newState;
    case SCHEMA_REMOVE_COMPONENT:
      const removeId = payload;
      newState = state;
      if (newState.result.includes(removeId)) {
        // if the component is in root
        newState = newState.update('result', ids => ids.filter(id => id !== removeId));
      } else {
        // find the parent component
        const parentComponent = find(newState.entities.components, o => o.children.includes(removeId));
        if (parentComponent) {
          newState = newState.updateIn(
            ['entities', 'components', parentComponent.id],
            comps => comps.update('children', ids => ids.filter(id => id !== removeId)),
          );
        }
      }
      // TODO:
      //  if the component has children
      //  need warn the user
      return newState.updateIn(['entities', 'components'], comps => comps.without(removeId));
    case SCHEMA_UPDATE_PROPS:
      const { nextProps } = payload;
      return state.merge({
        entities: {
          components: {
            [payload.id]: {
              props: nextProps,
            },
          },
        },
      }, { deep: true });
    default:
      return state;
  }
}

export {
  schema,
};
