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

console.log('initialState', initialState);

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
    components.some((c) => {
      if (c.id !== id) {
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
      return state;
    case SCHEMA_UPDATE_COMPONENT:
      const { activeComponent, focusComponent } = payload;
      if (!focusComponent || focusComponent === activeComponent) {
        // return origin state if focus component is null
        return state;
      }
      result = [...state.result];
      const activeComponentMeta = findComponent(activeComponent, result, components);
      if (!activeComponentMeta.pid) {
        result.splice(activeComponentMeta.index, 1);
      } else {
        components[activeComponentMeta.pid].children.splice(activeComponentMeta.index, 1);
      }
      const focusComponentMeta = findComponent(focusComponent, result, components);
      if (!focusComponentMeta.pid) {
        result.splice(focusComponentMeta.index + 1, 0, activeComponentMeta.id);
      } else {
        components[focusComponentMeta.pid].children.splice(focusComponentMeta.index + 1, 0, activeComponentMeta.id);
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
