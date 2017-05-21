import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as VComponents from '../../../visual-components';

import styles from './Canvas.css';

class Canvas extends Component {
  static defaultProps = {
    width: 600,
    height: 400,
    onDimensionUpdate: () => {},
    setFocus: () => {},
    setUnfocus: () => {},
    pickerOver: false,
    currentPicker: undefined,
    schemaData: [],
    activeComponent: null,
    focusComponent: null,
    setComponentActive() {},
    startDragging: () => {},
    stopDragging: () => {},
    dragging: false,
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onDimensionUpdate: PropTypes.func,
    setFocus: PropTypes.func,
    setUnfocus: PropTypes.func,
    pickerOver: PropTypes.bool,
    currentPicker: PropTypes.string,
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    focusComponent: PropTypes.string,
    setComponentActive: PropTypes.func,
    startDragging: PropTypes.func,
    stopDragging: PropTypes.func,
    dragging: PropTypes.bool,
  }
  componentDidMount() {
    this.handleUpdate();
  }
  componentDidUpdate(prevProps) {
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.handleUpdate();
    }
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
    const {
      activeComponent,
      focusComponent,
      dragging,
    } = this.props;
    return components.map((c) => {
      const View = VComponents[c.component].View;
      const viewProps = {
        id: c.id,
        key: c.id,
        ...c.props,
        active: activeComponent === c.id,
        focus: focusComponent === c.id,
        dragging,
        canvas: this,
      };
      return <View {...viewProps}>{this.renderComponents(c.children)}</View>;
    });
  }
  renderSchema() {
    const { schemaData } = this.props;
    return this.renderComponents(schemaData);
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

