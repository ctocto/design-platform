import assign from 'lodash/assign';
import { prototype } from '../base/';
import Icon from './icon.svg';
import {
  NumberSetter,
} from '../../setters/';

export default assign({}, prototype, {
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
