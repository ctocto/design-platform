import PropTypes from 'prop-types';
import fill from 'lodash/fill';
import Flex from 'antd-mobile/lib/flex/index.web';
import 'antd-mobile/lib/flex/style/index.css';
import BaseView from '../base/';
import { Docker } from '../../app/components/sketch-board/';
// import styles from './View.css';
import Placeholder from './Placeholder';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
  }
  static propTypes = {
    ...BaseView.propTypes,
  }
  renderView() {
    const { store, children } = this.props;
    const props = store.getProps();
    const { count, direction, justify, align } = props;
    let hasDocker = false;
    let inner;
    let key;
    const content = fill(Array(count)).map((d, i) => {
      if (children[i]) {
        inner = <div style={{padding: 20}}>{children[i]}</div>;
        key = children[i].key;
      } else if (hasDocker) {
        inner = <Placeholder />;
        key = `placeholder-${i}`;
      } else {
        inner = <Docker />;
        key = `docker-${i}`;
        hasDocker = true;
      }
      return (
        <Flex.Item key={key}>{inner}</Flex.Item>
      );
    });

    const flexProps = {
      direction,
      justify,
      align,
    };
    return (
      <Flex {...flexProps}>
        {content}
      </Flex>
    );
  }
}
