import PropTypes from 'prop-types';
import fill from 'lodash/fill';
import Flex from 'antd-mobile/lib/flex/index.web';
import 'antd-mobile/lib/flex/style/index.css';
import BaseView from '../base/';
import { Docker } from '../../app/components/sketch-board/';
import styles from './View.css';

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
    const { columns } = props;
    const items = fill(Array(columns), 0).map((v, i) =>
      <Flex.Item key={i}>
        {children[i] ? children[i] : <Docker>{null}</Docker>}
      </Flex.Item>,
    );
    return (
      <div className={styles.Layout__Wrapper}>
        <Flex>{items}</Flex>
      </div>
    );
  }
}
