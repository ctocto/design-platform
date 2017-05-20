import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as VComponents from '../../../visual-components';

import styles from './Canvas.css';

class Canvas extends Component {
  static defaultProps = {
    width: 600,
    height: 400,
    onDimensionUpdate: () => {},
    setActive: () => {},
    setInactive: () => {},
    pickerOver: false,
    currentPicker: undefined,
    schemaData: [],
    activeComponentsIndex: {},
    startDragging: () => {},
    stopDragging: () => {},
    dragging: false,
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onDimensionUpdate: PropTypes.func,
    setActive: PropTypes.func,
    setInactive: PropTypes.func,
    pickerOver: PropTypes.bool,
    currentPicker: PropTypes.string,
    schemaData: PropTypes.array,
    activeComponentsIndex: PropTypes.object,
    startDragging: PropTypes.func,
    stopDragging: PropTypes.func,
    dragging: PropTypes.bool,
  }
  componentDidUpdate() {
    this.handleUpdate();
  }
  componentDidMount() {
    this.handleUpdate();
  }
  handleUpdate() {
    const rect = this.el.getBoundingClientRect();
    this.props.onDimensionUpdate({
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    });
  }
  renderComponents(components) {
    const { setActive, setInactive, activeComponentsIndex, dragging } = this.props;
    return components.map(c => (
      createElement(VComponents[c.component].View, {
        key: c.id,
        ...c.props,
        children: this.renderComponents(c.children),
        mouseEnter() {
          console.log('enter', c.id);
          setActive(c.id);
        },
        mouseLeave() {
          console.log('leave', c.id);
          setInactive(c.id);
        },
        startDragging() {},
        stopDragging() {},
        active: !!activeComponentsIndex[c.id],
        dragging,
      })
    ));
  }
  renderSchema() {
    const { schemaData } = this.props;
    let schemaResult = this.renderComponents(schemaData);
    return schemaResult;
  }
  render() {
    const { width, height, pickerOver } = this.props;
    const canvasProps = {
      className: classnames(styles.canvas, {
        [styles['canvas--pickerOver']]: pickerOver,
      }),
      style: {
        width,
        height,
      },
      ref: node => (this.el = node),
    };
    return (
      <div {...canvasProps}>
        {this.renderSchema()}
      </div>
    );
  }
}

export default Canvas;

