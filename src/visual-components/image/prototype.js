import { createPrototype } from '../../engine/visualEngine';
import {
  BoolSetter,
  TextSetter,
  NumberSetter,
} from '../../setters/';
import Icon from './icon.svg';

export default createPrototype({
  icon: <Icon width={48} height={48} />,
  name: 'Image',
  configers: [
    {
      name: 'src',
      title: '地址',
      setter: <TextSetter placeholder={'图片地址'} />,
      defaultValue: 'http://via.placeholder.com/640x480/',
    },
    {
      name: 'auto',
      title: '自适应',
      setter: <BoolSetter />,
      defaultValue: true,
    },
    {
      name: 'width',
      title: '宽',
      setter({ fields }) {
        return (
          <NumberSetter
            disabled={fields.auto}
          />
        );
      },
      defaultValue: 200,
    },
    {
      name: 'height',
      title: '高',
      setter({ fields }) {
        return (
          <NumberSetter
            disabled={fields.auto}
          />
        );
      },
      defaultValue: 100,
    },
  ],
});
