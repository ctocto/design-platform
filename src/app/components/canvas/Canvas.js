import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Canvas.css';

class Canvas extends Component {
  static defaultProps = {
    width: 600,
    height: 400,
    onDimensionUpdate: () => {},
    pickerOver: false,
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onDimensionUpdate: PropTypes.func,
    pickerOver: PropTypes.bool,
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
      </div>
    );
  }
}

export default Canvas;

