import { createActions } from 'redux-actions';
import {
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
} from './actionTypes';

export const {
  schemaAddComponent: addComponentToSchema,
  schemaRemoveComponent: removeComponent,
  schemaUpdateComponent: updateComponent,
  schemaUpdateProps: updateComponentProps,
} = createActions(
  SCHEMA_ADD_COMPONENT,
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
);

