import { createActions } from 'redux-actions';
import { SCHEMA_ADD_COMPONENT, SCHEMA_REMOVE_COMPONENT, SCHEMA_UPDATE_COMPONENT } from './actionTypes';

export const {
  schemaAddComponent: addComponentToSchema,
  schemaRemoveComponent: removeComponentFromSchema,
  schemaUpdateComponent: updateComponentInSchema,
} = createActions(
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
);

