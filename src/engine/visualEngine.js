import pick from 'lodash/pick';
import setterProvider from '../helpers/setter-hoc';

export const createPrototype = config => ({
  meta: pick(config, ['icon', 'name']),
  factory(cid, setProp) {
    const { icon, name } = config;
    return {
      cid,
      icon,
      name,
      configers: config.configers.map(item => {
        const o = new Proxy({
          name: item.name,
          title: item.title,
        }, {
          set(target, propKey, value, receiver) {
            if (propKey === 'value') {
              setProp({
                id: cid,
                nextProps: {
                  [item.name]: value,
                },
              });
            }
            return Reflect.set(target, propKey, value, receiver);
          },
        });
        Object.defineProperty(o, 'setter', {
          value: setterProvider.call(o, item.setter, item),
        });
        if (item.defaultValue) {
          o.value = item.defaultValue;
        }
        return o;
      }),
    };
  },
});
