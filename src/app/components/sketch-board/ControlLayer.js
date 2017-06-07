import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from 'react';
// import Draggable from 'react-draggable';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { shallowEqual } from 'recompose';
import { DragSource, DropTarget } from 'react-dnd';

import { DndTypes } from '../../constants';
import styles from './ControlLayer.css';
import Drag from './drag.svg';
import Delete from './delete.svg';

const compareKeys = [
  'id',
  'active',
  'focus',
  'className',
];

class ControlLayer extends PureComponent {
  static defaultProps = {
    id: undefined,
    active: false,
    focus: false,
    className: '',
    handleClick() {},
    handleDragStart() {},
    handleDragStop() {},
    handleControlClick() {},
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    focus: PropTypes.bool,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    handleDragStart: PropTypes.func,
    handleDragStop: PropTypes.func,
    handleControlClick: PropTypes.func,
  }
  shouldComponentUpdate(nextProps) {
    if (
      shallowEqual(
        this.props.children.props.store.getProps(),
        nextProps.children.props.store.getProps(),
      ) &&
      shallowEqual(
        pick(this.props, compareKeys),
        pick(nextProps, compareKeys),
      ) &&
      shallowEqual(
        get(this.props, ['style']),
        get(nextProps, ['style']),
      )
    ) {
      return false;
    }
    return true;
  }
  handleClickDeleteBtn = (e) => {
    e.stopPropagation();
    this.props.handleControlClick('delete');
  }
  render() {
    const {
      id,
      active,
      focus,
      className,
      handleClick,
      handleDragStart,
      handleDragStop,
      handleControlClick,
      children,
      connectClassDropTarget,
      connectInstanceDropTarget,
      connectDragSource,
      ...otherProps
    } = this.props;
    const props = {
      ['data-cid']: id,
      className: classnames(className, styles.Layer__wrapper, {
        [styles['Layer__wrapper--active']]: active,
        [styles['Layer__wrapper--focus']]: focus,
      }),
      onClick: handleClick,
      ...otherProps,
    };
    console.warn('render controlLayer');
    return connectDragSource(
      connectInstanceDropTarget(
        connectClassDropTarget(
          <div {...props}>
            <button
              className={classnames(
                styles.Layer__controlBtn,
                styles.Layer__deleteBtn,
              )}
              onClick={this.handleClickDeleteBtn}
            >
              <Delete width={16} height={16} />
            </button>
            <button
              className={classnames(
                `control-handler-${id}`,
                styles.Layer__controlBtn,
                styles.Layer__dragControl,
              )}
            >
              <Drag width={16} height={16} />
            </button>
            {children}
          </div>,
      )));
  }
}

const classTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      return {
        target: 'instance',
        id: props.id,
        status: 'OVER',
      };
    }
  },
};
const instanceTarget = {

};
const instanceSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },
};

export default DropTarget(
  DndTypes.CLASS,
  classTarget,
  connect => ({
    connectClassDropTarget: connect.dropTarget(),
  }),
)(DropTarget(
  DndTypes.INSTANCE,
  instanceTarget,
  connect => ({
    connectInstanceDropTarget: connect.dropTarget(),
  }),
)(DragSource(
  DndTypes.INSTANCE,
  instanceSource,
  connect => ({
    connectDragSource: connect.dragSource(),
  }),
)(ControlLayer)));
