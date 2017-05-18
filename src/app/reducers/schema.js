import { SCHEMA_ADD_COMPONENT, SCHEMA_REMOVE_COMPONENT, SCHEMA_UPDATE_COMPONENT } from '../actions/actionTypes';
import { normalize } from 'normalizr';
import { appSchema } from '../schema/';

const initialState = normalize({
  app: {},
}, appSchema);
console.log(initialState);

function schema(state = initialState, action) {
  switch (action) {
    case SCHEMA_ADD_COMPONENT:
      return {};
    case SCHEMA_REMOVE_COMPONENT:
      return {};
    case SCHEMA_UPDATE_COMPONENT:
      return {};
    default:
      return state;
  }
}

export {
  schema,
};
