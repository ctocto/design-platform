import { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './ComponentPicker.css';

export default class ComponentPicker extends Component {
  static defaultProps = {
    name: undefined,
    prototype: undefined,
    canvasDimension: undefined,
    addComponent() {},
  }
  static propTypes = {
    name: PropTypes.string,
    prototype: PropTypes.object,
    canvasDimension: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    addComponent: PropTypes.func,
  }
  state = {
    dragInCanvas: false,
  }
  onStart = (e, data) => {
    const rect = data.node.getBoundingClientRect();
    this.originPos = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    };
  }
  onDrag = (e, data) => {
    const pos = {
      x: data.x,
      y: data.y,
    };
    const { dragInCanvas } = this.state;
    if (dragInCanvas) {
      if (!this.calculatePickerIsInCanvas(pos)) {
        this.setState({
          dragInCanvas: false,
        });
      }
    } else if (this.calculatePickerIsInCanvas(pos)) {
      this.setState({
        dragInCanvas: true,
      });
    }
  }
  onStop = () => {
    const { dragInCanvas } = this.state;
    if (dragInCanvas) {
      this.setState({
        dragInCanvas: false,
      });
      const { name } = this.props;
      const componentName = name;
      this.props.addComponent({
        componentName,
      });
    }
  }
  calculatePickerIsInCanvas(pos) {
    const { canvasDimension } = this.props;
    if (!(pos && this.originPos && canvasDimension)) return false;
    if ((this.originPos.bottom + pos.y >= canvasDimension.top)
      && (this.originPos.top + pos.y <= canvasDimension.bottom)) {
      if ((this.originPos.right + pos.x >= canvasDimension.left)
      && (this.originPos.left + pos.x <= canvasDimension.right)) {
        return true;
      }
    }
    return false;
  }
  renderDragContent() {
    const { dragInCanvas } = this.state;
    return (
      <div
        className={classnames(styles.grid__draglayer, {
          [styles['grid__draglayer--oncanvas']]: dragInCanvas,
        })}
      />
    );
  }
  render() {
    const { name, prototype } = this.props;
    return (
      <div className={styles.grid} key={name}>
        <div className={styles.grid__icon}>{ prototype.icon }</div>
        <p>{prototype.name}</p>
        <Draggable
          position={{ x: 0, y: 0 }}
          onStart={this.onStart}
          onDrag={this.onDrag}
          onStop={this.onStop}
          offsetParent={document.documentElement}
        >
          {this.renderDragContent()}
        </Draggable>
      </div>
    );
  }
}
