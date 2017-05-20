import { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assign from 'lodash/assign';

import styles from './ComponentPicker.css';
import * as VComponents from '../../../visual-components';

export default class ComponentPicker extends Component {
  static defaultProps = {
    name: undefined,
    prototype: undefined,
    addComponentToSchema() {},
    canvasDimension: undefined,
    activeComponentsIndex: {},
  }
  static propTypes = {
    name: PropTypes.string,
    prototype: PropTypes.object,
    addComponentToSchema: PropTypes.func,
    canvasDimension: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    activeComponentsIndex: PropTypes.object,
  }
  state = {
    dragInCanvas: false,
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
    } else {
      if (this.calculatePickerIsInCanvas(pos)) {
        this.setState({
          dragInCanvas: true
        });
      }
    }
  }
  onStop = (e, data) => {
    const { dragInCanvas } = this.state; 
    if (dragInCanvas) {
      this.setState({
        dragInCanvas: false,
      });
      const { name, activeComponentsIndex } = this.props;
      const componentName = name;
      const componentProps = {};
      const ids = Object.keys(activeComponentsIndex);
      let pid = null;
      const info = {
        pid: null,
        index: -1,
      };
      if (ids.length > 0) {
        assign(info, {
          pid: activeComponentsIndex[ids[0]].pid,
          index: activeComponentsIndex[ids[0]].index + 1,
        });
      }
      this.props.addComponentToSchema(assign(info, {
        componentName,
        componentProps,
      }));
    }
  }
  renderDragContent() {
    let dragContent;
    const { dragInCanvas } = this.state;
    return (
      <div
        className={classnames(styles.grid__draglayer, {
          [styles['grid__draglayer--oncanvas']]: dragInCanvas,
        })}
      ></div>
    );
  }
  render() {
    const { name, prototype } = this.props;
    const { dragInCanvas } = this.state;
    return (
      <div className={styles.grid} key={name}>
        <div className={styles.grid__icon}>{ prototype.icon }</div>
        <p>{prototype.name}</p>
        <Draggable
          position={{x: 0, y: 0}}
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