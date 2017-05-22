import PropTypes from 'prop-types';
import BaseView from '../base/';

import styles from './View.css';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
    content: '',
  }
  static propTypes = {
    ...BaseView.propTypes,
    content: PropTypes.string,
  }
  renderView() {
    const { store } = this.props;
    const viewProps = store.getProps();
    return <div className={styles.Text__Wrapper}>{viewProps.content}</div>;
  }
}
