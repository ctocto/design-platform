import assign from 'lodash/assign';
import {
  TextSetter,
} from '../../setters/';
import { prototype } from '../base/';
import Icon from './icon.svg';

export default assign({}, prototype, {
  icon: <Icon width={48} height={48} />,
  name: 'Text',
  configers: [
    {
      name: 'content',
      title: '内容',
      setter: <TextSetter
        multipleLine
        placeholder={'这里是placeholder'}
      />,
      defaultValue: 'Text Content',
    },
  ],
});
