import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DropTarget } from 'react-dnd';

import { DndTypes } from '../../constants';
import styles from './Docker.css';

class Docker extends Component {
  static defaultProps = {
    connectClassDropTarget() {},
    connectInstanceDropTarget() {},
  }
  static propTypes = {
    connectClassDropTarget: PropTypes.func,
    connectInstanceDropTarget: PropTypes.func,
  }
  static contextTypes = {
    id: PropTypes.string,
  }
  static getStateByProps = props => ({
    focus: props.hoverByClass || props.hoverByInstance,
  })
  constructor(props) {
    super(props);
    this.state = Docker.getStateByProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(Docker.getStateByProps(nextProps));
  }
  render() {
    const {
      children,
      connectClassDropTarget,
      connectInstanceDropTarget,
    } = this.props;
    const dockerProps = {
      className: classnames(styles.Docker__wrapper, {
        [styles['Docker__wrapper--active']]: this.state.focus,
      }),
    };
    return connectClassDropTarget(connectInstanceDropTarget(
      <div {...dockerProps}>{children}</div>,
    ));
  }
}

const classTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      return {
        target: 'instance',
        status: 'INSIDE',
        id: component.decoratedComponentInstance.context.id,
      };
    }
  },
};

const instanceTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      return {
        target: 'instance',
        status: 'INSIDE',
        id: component.context.id,
      };
    }
  },
};

export default DropTarget(
  DndTypes.CLASS,
  classTarget,
  (connect, monitor) => ({
    connectClassDropTarget: connect.dropTarget(),
    hoverByClass: monitor.isOver({ shallow: true }),
  }),
)(DropTarget(
  DndTypes.INSTANCE,
  instanceTarget,
  (connect, monitor) => ({
    connectInstanceDropTarget: connect.dropTarget(),
    hoverByInstance: monitor.isOver({ shallow: true }),
  }),
)(Docker));
