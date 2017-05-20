import { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import styles from './View.css';
import Drag from './drag.svg';

export default class BaseView extends Component {
  static defaultProps = {
    active: false,
    dragging: false,
    mouseEnter() {},
    mouseLeave() {},
    startDragging() {},
    stopDragging() {},
  }
  static propTypes = {
    active: PropTypes.bool,
    dragging: PropTypes.bool,
    mouseEnter: PropTypes.func,
    mouseLeave: PropTypes.func,
    startDragging: PropTypes.func,
    stopDragging: PropTypes.func,
  }
  handleMouseEnter = (e) => {
    const { dragging } = this.props;
    if (!dragging) {
      this.props.mouseEnter();
    }
  }
  handleMouseLeave = (e) => {
    const { dragging } = this.props;
    if (!dragging) {
      this.props.mouseLeave();
    }
  }
  handleStartDrag = () => {
    this.props.startDragging();
  }
  handleStopDrag = () => {
    this.props.stopDragging();
  }
  render() {
    const { active } = this.props;
    const wrapperProps = {
      className: styles.Component__wrapper,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };
    const viewContent = (
      <div {...wrapperProps}>
        <div
          className={classnames(
            styles.Component__actionCover,
            {
              [styles['Component__actionCover--active']]: active,
            }
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
    if (active) {
      return (
        <Draggable
          position={{x: 0, y: 0}}
          handle={`.${styles.Component__dragControl}`}
          onStart={this.handleStartDrag}
          onStop={this.handleStopDrag}
        >
          {viewContent}
        </Draggable>
      );
    } else {
      return viewContent;
    }
  }
}
