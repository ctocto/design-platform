import assign from 'lodash/assign';
import find from 'lodash/find';
import { normalize } from 'normalizr';
import Immutable from 'seamless-immutable';
import {
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
} from '../actions/actionTypes';
import { appSchema } from '../schema/';

const initialState = Immutable(normalize([], appSchema));

const insertAfter = (array, target, value) => {
  let index = array.indexOf(target);
  if (index === -1) {
    index = array.length + 1;
  } else {
    index += 1;
  }
  return array.slice(0, index).concat([value]).concat(array.slice(index));
};

const removeById = (array, id) => {
  const index = array.indexOf(id);
  return array.slice(0, index).concat(array.slice(index + 1));
};

const findParentComponent = (components = {}, id) => find(
  Object.values(components),
  o => o.children.includes(id),
);

const updateSchemaByInsert = (schemaData, tid, id) => {
  let ret;
  if (!tid || schemaData.result.includes(tid)) {
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

function schema(state = initialState, action) {
  const { payload } = action;
  let newState;
  switch (action.type) {
    case SCHEMA_UPDATE_COMPONENT:
      const {
        component, // needly when type is ADD
        props, // needly when type is ADD
        type, // ADD or UPDATE
        id,
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
        if (id === tid) {
          return state;
        }
        if (state.result.includes(id)) {
          newState = state.update('result', ids => removeById(ids, id));
        } else {
          const parentComponent = findParentComponent(state.entities.components, id);
          newState = state.updateIn(['entities', 'components', parentComponent.id, 'children'], ids => removeById(ids, id));
        }
        if (AS_CHILD) {
          newState = newState.updateIn(
            ['entities', 'components', tid, 'children'],
            ids => ids.concat([id]),
          );
        } else {
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
