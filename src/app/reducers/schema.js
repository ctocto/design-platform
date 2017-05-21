import { SCHEMA_ADD_COMPONENT, SCHEMA_REMOVE_COMPONENT, SCHEMA_UPDATE_COMPONENT } from '../actions/actionTypes';
import { normalize } from 'normalizr';
import { appSchema } from '../schema/';

const initialState = normalize([], appSchema);

console.log(initialState);

const insert = (array, index, value) => {
  if (index === -1) {
    array.splice(array.length, 0, value);
  } else {
    array.splice(index, 0, value);
  }
  return array;
};

function schema(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SCHEMA_ADD_COMPONENT:
      const { components } = state.entities;
      const newComp = {
        [payload.id]: {
          id: payload.id,
          component: payload.componentName,
          props: payload.componentProps,
          children: [],
        },
      };
      let entities;
      let result;
      if (payload.pid && components[payload.pid]) {
        const pc = components[payload.pid];
        result = [...state.result];
        entities = {
          components: {
            ...components,
            [payload.pid]: {
              ...pc,
              children: insert([...pc.children], payload.index, payload.id),
            },
            ...newComp,
          },
        };
      } else {
        result = insert([...state.result], payload.index, payload.id);
        entities = {
          components: {
            ...components,
            ...newComp,
          },
        };
      }
      return {
        entities,
        result,
      };
    case SCHEMA_REMOVE_COMPONENT:
      return state;
    case SCHEMA_UPDATE_COMPONENT:
      if (!payload.focusComponent) {
        // return origin state if focus component is null
        return state;
      } else {
        // TODO: find the new position by focus component
        const { result } = state;
        const { components } = state.entities;
        console.log(components, result);
        return state;
      }
    default:
      return state;
  }
}

export {
  schema,
};
