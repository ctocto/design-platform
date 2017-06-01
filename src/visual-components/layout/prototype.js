import { createPrototype } from '../../engine/visualEngine';
import Icon from './icon.svg';
import {
  NumberSetter,
} from '../../setters/';

export default createPrototype({
  type: 'container',
  icon: <Icon width={48} height={48} />,
  name: 'Layout',
  configers: [
    {
      name: 'columns',
      title: '列数',
      setter: <NumberSetter />,
      defaultValue: 3,
    },
  ],
});
