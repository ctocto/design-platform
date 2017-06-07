import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Docker.css';

export default class Docker extends Component {
  static defaultProps = {
  }
  static propTypes = {
  }
  static contextTypes = {
    id: PropTypes.string,
    focus: PropTypes.bool,
  }
  render() {
    const { children } = this.props;
    const { focus, id } = this.context;
    const dockerProps = {
      ['data-docker-id']: id,
      className: classnames(styles.Docker__wrapper, {
        [styles['Docker__wrapper--active']]: focus,
      }),
    };
    return <div {...dockerProps}>{children}</div>;
  }
}
