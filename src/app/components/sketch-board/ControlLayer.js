import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from 'react';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { shallowEqual } from 'recompose';
import { DragSource, DropTarget } from 'react-dnd';

import { DndTypes } from '../../constants';
import styles from './ControlLayer.css';
import Drag from './drag.svg';
import Delete from './delete.svg';

class ControlLayer extends PureComponent {
  static defaultProps = {
    id: undefined,
    active: false,
    className: '',
    handleClick() {},
    updateComponent() {},
    setActiveComponent() {},
    handleControlClick() {},
    connectClassDropTarget() {},
    connectInstanceDropTarget() {},
    connectDragSource() {},
    connectDragPreview() {},
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    updateComponent: PropTypes.func,
    setActiveComponent: PropTypes.func,
    handleControlClick: PropTypes.func,
    connectClassDropTarget: PropTypes.func,
    connectInstanceDropTarget: PropTypes.func,
    connectDragSource: PropTypes.func,
    connectDragPreview: PropTypes.func,
  }
  static getStateByProps = props => ({
    focus: props.hoverByClass || props.hoverByInstance,
  })
  constructor(props) {
    super(props);
    this.state = ControlLayer.getStateByProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(ControlLayer.getStateByProps(nextProps));
  }
  handleClickDeleteBtn = (e) => {
    e.stopPropagation();
    this.props.handleControlClick('delete');
  }
  render() {
    const {
      id,
      active,
      className,
      handleClick,
      handleControlClick,
      children,
      connectClassDropTarget,
      connectInstanceDropTarget,
      connectDragSource,
      connectDragPreview,
    } = this.props;
    const { focus } = this.state;
    const props = {
      className: classnames(className, styles.Layer__wrapper, {
        [styles['Layer__wrapper--active']]: active,
        [styles['Layer__wrapper--focus']]: focus,
      }),
      onClick: handleClick,
    };
    console.warn('render controlLayer');
    return connectInstanceDropTarget(
        connectClassDropTarget(
          connectDragPreview(
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
              {
                connectDragSource(
                  <button
                    className={classnames(
                      `control-handler-${id}`,
                      styles.Layer__controlBtn,
                      styles.Layer__dragControl,
                    )}
                  >
                    <Drag width={16} height={16} />
                  </button>,
                )
              }
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
const instanceSource = {
  beginDrag(props) {
    // props.setActiveComponent(props.id);
    return {
      id: props.id,
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const dropResult = monitor.getDropResult();
    props.updateComponent({
      tid: dropResult.id,
      type: 'UPDATE',
      id: props.id,
      AS_CHILD: dropResult.status !== 'OVER',
    });
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
)(DragSource(
  DndTypes.INSTANCE,
  instanceSource,
  connect => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }),
)(ControlLayer)));
