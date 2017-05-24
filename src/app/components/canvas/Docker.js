import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Docker.css';

export default class Docker extends Component {
  static defaultProps = {
    dockerRef() {},
  }
  static propTypes = {
    dockerRef: PropTypes.func,
  }
  state = {
    active: false,
  }
  handleEnter = () => {
    this.setState({
      active: true,
    });
  }
  handleLeave = () => {
    this.setState({
      active: false,
    });
  }
  render() {
    const { children, dockerRef } = this.props;
    const { active } = this.state;
    const dockerProps = {
      ref: dockerRef,
      className: classnames(styles.Docker__wrapper, {
        [styles['Docker__wrapper--active']]: active,
      }),
      onMouseEnter: this.handleEnter,
      onMouseLeave: this.handleLeave,
    };
    return <div {...dockerProps}>{children}</div>;
  }
}
