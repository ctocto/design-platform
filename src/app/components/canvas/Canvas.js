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
    pickerOver: false,
    currentPicker: undefined,
    schemaData: {},
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onDimensionUpdate: PropTypes.func,
    pickerOver: PropTypes.bool,
    currentPicker: PropTypes.string,
    schemaData: PropTypes.object,
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
  renderPageContent() {
    const { currentPicker, pickerOver } = this.props;
    const currentComponent = VComponents[currentPicker];
    let content = [];
    if (currentComponent && pickerOver) {
      content.push(
        createElement(currentComponent.View)
      );
    }
    return content;
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
        {this.renderPageContent()}
      </div>
    );
  }
}

export default Canvas;

