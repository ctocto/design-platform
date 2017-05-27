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
  const { components } = state.entities;
  let newState;
  switch (action.type) {
    case SCHEMA_ADD_COMPONENT:
      const newComp = {
        [payload.id]: {
          id: payload.id,
          component: payload.componentName,
          props: payload.componentProps,
          children: [],
        },
      };
      if (payload.pid && components[payload.pid]) {
        newState = state.updateIn(
          ['entities', 'components', payload.pid, 'children'],
          ids => insert(ids, payload.index, payload.id),
        ).merge({
          entities: {
            components: newComp,
          },
        }, { deep: true });
      } else {
        newState = state.update(
          'result',
          ids => insert(ids, payload.index, payload.id),
        ).merge({
          entities: {
            components: newComp,
          },
        }, { deep: true });
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
    case SCHEMA_UPDATE_COMPONENT:
      const { activeComponent, focusComponent, focusType } = payload;
      // 0. if has no active component
      //    or the focus one and the active one is the same component
      //    then return
      if (!activeComponent || focusComponent === activeComponent) {
        return state;
      }
      // 1. calculate the active component data
      const activeComponentMeta = findComponent(activeComponent, state.result, state.entities.components);
      // 2. shift out active component from the origin container
      if (!activeComponentMeta.pid) {
        newState = state.update(
          'result',
          ids => ids.slice(0, activeComponentMeta.index)
            .concat(ids.slice(activeComponentMeta.index + 1)),
        );
      } else {
        newState = state.updateIn(
          ['entities', 'components', activeComponentMeta.pid, 'children'],
          ids => ids.slice(0, activeComponentMeta.index)
            .concat(ids.slice(activeComponentMeta.index + 1)),
        );
      }

      // 3. if the focus component is null
      //    then move the active component to the end of result
      if (!focusComponent) {
        newState = newState.update('result', ids => ids.concat(activeComponent));
      } else {
        // 3. if focusType is 'INSERT'
        //    insert the active component to the focus component's children
        //    or
        //    insert active component after the focus component
        if (focusType === 'INSERT') {
          newState = newState.updateIn(
            ['entities', 'components', focusComponent, 'children'],
            ids => ids.concat(activeComponent),
          );
        } else {
          // calculate the focus component data
          const focusComponentMeta = findComponent(focusComponent, state.result, components);
          if (!focusComponentMeta.pid) {
            newState = newState.update(
              'result',
              ids => ids.slice(0, focusComponentMeta.index + 1)
                .concat([activeComponentMeta.id])
                .concat(ids.slice(focusComponentMeta.index + 1)),
            );
          } else {
            newState = newState.updateIn(
              ['entities', 'components', focusComponentMeta.pid, 'children'],
              ids => ids.slice(0, focusComponentMeta.index + 1)
                .concat([activeComponentMeta.id])
                .concat(ids.slice(focusComponentMeta.index + 1)),
            );
          }
        }
      }
      return newState;
    case SCHEMA_UPDATE_PROPS:
      const { id, nextProps } = payload;
      return state.merge({
        entities: {
          components: {
            [id]: {
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
