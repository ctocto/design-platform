import { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styles from './View.css';

export default class BaseView extends PureComponent {
  static defaultProps = {
    id: null,
    store: undefined,
  }
  static propTypes = {
    id: PropTypes.string,
    store: PropTypes.object,
  }
  render() {
    const wrapperProps = {
      className: styles.Component__wrapper,
    };
    return (
      <div {...wrapperProps}>
        {this.renderView()}
      </div>
    );
  }
}
