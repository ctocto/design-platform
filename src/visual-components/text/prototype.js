import { createPrototype } from '../../engine/visualEngine';
import {
  TextSetter,
} from '../../setters/';
import Icon from './icon.svg';

export default createPrototype({
  icon: <Icon width={48} height={48} />,
  name: 'Text',
  configers: [
    {
      name: 'content',
      title: '内容',
      setter: <TextSetter
        multipleLine
        placeholder={'请输入文本内容'}
      />,
      defaultValue: 'Text Content',
    },
  ],
});
