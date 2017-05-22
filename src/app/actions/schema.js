import { createActions } from 'redux-actions';
import {
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
} from './actionTypes';

export const {
  schemaAddComponent: addComponentToSchema,
  schemaRemoveComponent: removeComponentFromSchema,
  schemaUpdateComponent: updateComponentInSchema,
  schemaUpdateProps: updateComponentProps,
} = createActions(
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
);

