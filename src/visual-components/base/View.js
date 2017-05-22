import { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import isEqual from 'lodash/isEqual';
import styles from './View.css';
import Drag from './drag.svg';
import Canvas from '../../app/components/canvas/';

export default class BaseView extends Component {
  static defaultProps = {
    id: null,
    active: false,
    focus: false,
    canvas: null,
    store: undefined,
  }
  static propTypes = {
    id: PropTypes.string,
    active: PropTypes.bool,
    focus: PropTypes.bool,
    canvas: PropTypes.instanceOf(Canvas),
    store: PropTypes.object,
  }
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }
  handleClick = () => {
    const { canvas, id } = this.props;
    canvas.props.setComponentActive(id);
  }
  handleMouseEnter = () => {
    this.moveTimer = setTimeout(() => {
      const { canvas, id } = this.props;
      canvas.props.setFocus(id);
      this.moveTimer = null;
    }, 100);
  }
  handleMouseLeave = () => {
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
      this.moveTimer = null;
    } else {
      const { canvas, id } = this.props;
      canvas.props.setUnfocus(id);
    }
  }
  handleStartDrag = () => {
    const { canvas, id } = this.props;
    canvas.props.setComponentActive(id);
    canvas.props.startDragging();
  }
  handleStopDrag = () => {
    const { canvas } = this.props;
    canvas.props.stopDragging();
  }
  render() {
    const { active, focus } = this.props;
    const wrapperProps = {
      className: styles.Component__wrapper,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleClick,
    };
    const viewContent = (
      <div {...wrapperProps}>
        <div
          className={classnames(
            styles.Component__actionCover,
            {
              [styles['Component__actionCover--active']]: active,
              [styles['Component__actionCover--focus']]: focus,
            },
          )}
        >
          <button
            className={classnames(
              styles.Component__controller,
              styles.Component__dragControl,
            )}
          >
            <Drag width={16} height={16} />
          </button>
        </div>
        {this.renderView()}
      </div>
    );
    return (
      <Draggable
        position={{ x: 0, y: 0 }}
        handle={`.${styles.Component__dragControl}`}
        onStart={this.handleStartDrag}
        onStop={this.handleStopDrag}
        defaultClassNameDragging={styles['Component--dragging']}
      >
        {viewContent}
      </Draggable>
    );
  }
}
