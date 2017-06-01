import PropTypes from 'prop-types';
import BaseView from '../base/';

import styles from './View.css';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
    src: '',
  }
  static propTypes = {
    ...BaseView.propTypes,
    src: PropTypes.string,
  }
  renderView() {
    const { store } = this.props;
    const viewProps = store.getProps();
    return <div><img src={viewProps.src} alt="" /></div>;
  }
}
