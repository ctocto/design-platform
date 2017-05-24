import { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Picker.css';

export default class Picker extends Component {
  static defaultProps = {
    name: undefined,
    prototype: undefined,
    sketchDimension: undefined,
    addComponent() {},
  }
  static propTypes = {
    name: PropTypes.string,
    prototype: PropTypes.object,
    sketchDimension: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    addComponent: PropTypes.func,
  }
  state = {
    dragInBoard: false,
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
    const { dragInBoard } = this.state;
    if (dragInBoard) {
      if (!this.calculatePickerIsInCanvas(pos)) {
        this.setState({
          dragInBoard: false,
        });
      }
    } else if (this.calculatePickerIsInCanvas(pos)) {
      this.setState({
        dragInBoard: true,
      });
    }
  }
  onStop = () => {
    const { dragInBoard } = this.state;
    if (dragInBoard) {
      this.setState({
        dragInBoard: false,
      });
      const { name } = this.props;
      const componentName = name;
      this.props.addComponent({
        componentName,
      });
    }
  }
  calculatePickerIsInCanvas(pos) {
    const { sketchDimension } = this.props;
    if (!(pos && this.originPos && sketchDimension)) return false;
    if ((this.originPos.bottom + pos.y >= sketchDimension.top)
      && (this.originPos.top + pos.y <= sketchDimension.bottom)) {
      if ((this.originPos.right + pos.x >= sketchDimension.left)
      && (this.originPos.left + pos.x <= sketchDimension.right)) {
        return true;
      }
    }
    return false;
  }
  renderDragContent() {
    const { dragInBoard } = this.state;
    return (
      <div
        className={classnames(styles.grid__draglayer, {
          [styles['grid__draglayer--oncanvas']]: dragInBoard,
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
