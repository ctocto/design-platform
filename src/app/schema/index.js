import { schema } from 'normalizr';
import assign from 'lodash/assign';

const component = new schema.Entity('components', {}, {
  idAttribute(value, parent) {
    let id;
    if (parent && parent.id) {
      id = [parent.id, value.component].join('/');
    } else {
      id = value.component;
    }
    return id;
  },
  processStrategy(entity, parent, key) {
    const ret = {};
    let id;
    if (key === 'children') {
      id = [parent.component, entity.component].join('/');
    } else {
      id = entity.component;
    }
    if (id) {
      assign(ret, entity, {
        id,
      });
    }
    return ret;
  },
});

component.define({
  children: [component],
});

const appSchema = {
  app: component,
};

export { appSchema };
