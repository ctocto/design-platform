import { createActions } from 'redux-actions';
import {
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
} from './actionTypes';

export const {
  schemaRemoveComponent: removeComponent,
  schemaUpdateComponent: updateComponent,
  schemaUpdateProps: updateComponentProps,
} = createActions(
  SCHEMA_REMOVE_COMPONENT,
  SCHEMA_UPDATE_COMPONENT,
  SCHEMA_UPDATE_PROPS,
);

