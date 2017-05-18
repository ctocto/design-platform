import { createActions } from 'redux-actions';
import { SCHEMA_ADD_COMPONENT, SCHEMA_REMOVE_COMPONENT, SCHEMA_UPDATE_COMPONENT } from './actionTypes';

export const {
  addComponentToSchema,
  removeComponentFromSchema,
  updateComponentInSchema,
} = createActions(
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
);
