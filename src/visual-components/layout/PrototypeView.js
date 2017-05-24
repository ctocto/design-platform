import PropTypes from 'prop-types';
import BaseView from '../base/';
import { Docker } from '../../app/components/sketch-board/';
import styles from './View.css';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
    dockerRef() {},
  }
  static propTypes = {
    ...BaseView.propTypes,
    dockerRef: PropTypes.func,
  }
  renderView() {
    const { store, dockerRef, children } = this.props;
    const dockerProps = {
      dockerRef,
    };
    return (
      <div className={styles.Layout__Wrapper}>
        <Docker {...dockerProps}>{children}</Docker>
      </div>
    );
  }
}
