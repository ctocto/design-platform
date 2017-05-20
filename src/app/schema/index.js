import { schema } from 'normalizr';

const component = new schema.Entity('components');

component.define({
  children: [component],
});

const appSchema = [component];

export { appSchema };
