import { Component } from 'react';
import PropTypes from 'prop-types';

class Canvas extends Component {
  static defaultProps = {
    width: 600,
    height: 400,
    onDimensionUpdate: () => {},
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onDimensionUpdate: PropTypes.func,
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
    const { width, height } = this.props;
    const canvasProps = {
      style: {
        width,
        height,
        border: '1px solid #000',
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

