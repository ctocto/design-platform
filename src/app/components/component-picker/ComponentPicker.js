import { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import styles from './ComponentPicker.css';
import * as VComponents from '../../../visual-components';

console.log(VComponents)

export default class ComponentGrid extends Component {
  static defaultProps = {
    name: undefined,
    prototype: undefined,
    position: {
      x: 0,
      y: 0,
    },
    pickerInCanvas: false,
    pickStart() {},
    pickEnd() {},
    updatePickerPosition() {},
  }
  static propTypes = {
    name: PropTypes.string,
    prototype: PropTypes.object,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    pickerInCanvas: PropTypes.bool,
    pickStart: PropTypes.func,
    pickEnd: PropTypes.func,
    updatePickerPosition: PropTypes.func,
  }
  onStart = (e, data) => {
    const rect = data.node.getBoundingClientRect();
    const originPos = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    };
    this.props.pickStart(this.props.name, originPos);
  }
  onDrag = (e, data) => {
    const pos = {
      x: data.x,
      y: data.y,
    };
    this.props.updatePickerPosition(pos);
  }
  onStop = (e, data) => {
    this.props.pickEnd(this.props.name);
  }
  renderDragContent() {
    const { pickerInCanvas, name } = this.props;
    let dragContent;
    if (pickerInCanvas) {
      dragContent = <div></div>;
    } else {
      dragContent = <div className={styles.grid__draglayer}></div>;
    }
    return dragContent;
  }
  render() {
    const { name, prototype, position, pickerInCanvas } = this.props;
    return (
      <div className={styles.grid} key={name}>
        <div className={styles.grid__icon}>{ prototype.icon }</div>
        <p>{prototype.name}</p>
        <Draggable
          position={position}
          onStart={this.onStart}
          onDrag={this.onDrag}
          onStop={this.onStop}
          offsetParent={document.documentElement}
          disabled={pickerInCanvas}
        >
          {this.renderDragContent()}
        </Draggable>
      </div>
    );
  }
}