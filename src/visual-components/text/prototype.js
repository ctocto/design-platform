import assign from 'lodash/assign';
import { prototype } from '../base/';
import Icon from './icon.svg';

export default assign({}, prototype, {
  icon: <Icon width={48} height={48} />,
  name: 'Text',
});
