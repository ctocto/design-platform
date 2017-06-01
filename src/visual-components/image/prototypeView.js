import PropTypes from 'prop-types';
import BaseView from '../base/';

import styles from './View.css';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
    src: '',
    width: undefined,
    height: undefined,
  }
  static propTypes = {
    ...BaseView.propTypes,
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }
  renderView() {
    const { store } = this.props;
    const {
      src, width, height,
    } = store.getProps();
    const imageProps = {
      src,
      width,
      height,
      alt: '',
    };
    return (
      <div>
        <img {...imageProps} />
      </div>
    );
  }
}
