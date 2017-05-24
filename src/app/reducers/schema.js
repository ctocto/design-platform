import assign from 'lodash/assign';
import { normalize } from 'normalizr';
import {
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
} from '../actions/actionTypes';
import { appSchema } from '../schema/';

const initialState = normalize([], appSchema);

const insert = (array, index, value) => {
  if (index === -1) {
    array.splice(array.length, 0, value);
  } else {
    array.splice(index, 0, value);
  }
  return array;
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
  const components = { ...state.entities.components };
  let entities;
  let result;
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
        const pc = components[payload.pid];
        result = [...state.result];
        entities = {
          components: assign(components, {
            [payload.pid]: {
              ...pc,
              children: insert([...pc.children], payload.index, payload.id),
            },
            ...newComp,
          }),
        };
      } else {
        result = insert([...state.result], payload.index, payload.id);
        entities = {
          components: assign(components, newComp),
        };
      }
      return {
        entities,
        result,
      };
    case SCHEMA_REMOVE_COMPONENT:
      const removeId = payload;
      result = [...state.result];
      if (result.includes(removeId)) {
        // if the component is in root
        result = result.filter(id => id !== removeId);
      } else {
        // find the parent component
        Object.keys(components).forEach((cid) => {
          if (removeId !== cid) {
            if (components[cid].children.includes(removeId)) {
              components[cid].children = components[cid].children.filter(id => id !== removeId);
            }
          }
        });
      }
      // TODO:
      //  if the component has children
      //  need warn the user
      delete components[removeId];
      return {
        result,
        entities: {
          components,
        },
      };
    case SCHEMA_UPDATE_COMPONENT:
      const { activeComponent, focusComponent, focusType } = payload;
      // 0. if has no active component
      //    or the focus one and the active one is the same component
      //    then return
      if (!activeComponent || focusComponent === activeComponent) {
        return state;
      }
      result = [...state.result];
      // 1. calculate the active component data
      const activeComponentMeta = findComponent(activeComponent, result, components);
      // 2. shift out active component from the origin container
      if (!activeComponentMeta.pid) {
        result.splice(activeComponentMeta.index, 1);
      } else {
        components[activeComponentMeta.pid].children.splice(activeComponentMeta.index, 1);
      }

      // 3. if the focus component is null
      //    then move the active component to the end of result
      if (!focusComponent) {
        result.push(activeComponent);
      } else {
        // 3. if focusType is 'INSERT'
        //    insert the active component to the focus component's children
        //    or
        //    insert active component after the focus component
        if (focusType === 'INSERT') {
          components[focusComponent].children.push(activeComponent);
        } else {
          // calculate the focus component data
          const focusComponentMeta = findComponent(focusComponent, result, components);
          if (!focusComponentMeta.pid) {
            result.splice(focusComponentMeta.index + 1, 0, activeComponentMeta.id);
          } else {
            components[focusComponentMeta.pid].children.splice(
              focusComponentMeta.index + 1,
              0,
              activeComponentMeta.id,
            );
          }
        }
      }
      return {
        result,
        entities: {
          components,
        },
      };
    case SCHEMA_UPDATE_PROPS:
      const { id, nextProps } = payload;
      result = [...state.result];
      assign(components[id].props, nextProps);
      return {
        result,
        entities: {
          components,
        },
      };
    default:
      return state;
  }
}

export {
  schema,
};
