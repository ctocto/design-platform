import { PureComponent } from 'react';
// import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assign from 'lodash/assign';
import { onlyUpdateForKeys } from 'recompose';
import { DragSource } from 'react-dnd';

import { DndTypes } from '../../constants';
import styles from './Picker.css';

const componentSource = {
  beginDrag(props, monitor) {
    return {
      name: props.name,
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const dropResult = monitor.getDropResult();
    console.warn(dropResult);
    props.addComponent(assign({
      componentName: props.name,
    }, dropResult));
  },
};

// @onlyUpdateForKeys(['inSketch', 'name'])
class Picker extends PureComponent {
  static defaultProps = {
    name: undefined,
    meta: undefined,
    addComponent() {},
  }
  static propTypes = {
    name: PropTypes.string,
    meta: PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.node,
    }),
    addComponent: PropTypes.func,
  }
  render() {
    const {
      name,
      meta,
      connectDragSource,
    } = this.props;
    return connectDragSource(
      <div className={styles.grid} key={name}>
        <div className={styles.grid__icon}>{ meta.icon }</div>
        <p>{meta.name}</p>
        <div className={classnames(styles.grid__draglayer)} />
      </div>
    );
  }
}

export default DragSource(
  DndTypes.CLASS,
  componentSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    // isDragging: monitor.isDragging(),
  }),
)(Picker);
