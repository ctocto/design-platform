import { createPrototype } from '../../engine/visualEngine';
import Icon from './icon.svg';
import {
  NumberSetter,
  SelectSetter,
} from '../../setters/';

export default createPrototype({
  type: 'container',
  icon: <Icon width={48} height={48} />,
  name: 'Flex容器',
  configers: [
    {
      name: 'count',
      title: '容器数',
      setter: <NumberSetter />,
      defaultValue: 1,
    },
    {
      name: 'direction',
      title: '方向',
      setter: (
        <SelectSetter
          options={
          [
            { value: 'row' },
            { value: 'column' },
          ]
          }
        />
      ),
      defaultValue: 'row',
    },
    {
      name: 'justify',
      title: '主轴对齐',
      setter: (
        <SelectSetter
          options={
          [
            { value: 'start' },
            { value: 'end' },
            { value: 'center' },
            { value: 'between' },
            { value: 'around' },
          ]
          }
        />
      ),
      defaultValue: 'start',
    },
    {
      name: 'align',
      title: '交叉轴对齐',
      setter: (
        <SelectSetter
          options={
          [
            { value: 'start/top' },
            { value: 'center/middle' },
            { value: 'end/bottom' },
            { value: 'baseline' },
            { value: 'stretch' },
          ]
          }
        />
      ),
      defaultValue: 'center',
    },
  ],
});
