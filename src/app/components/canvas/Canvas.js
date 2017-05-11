import { Component } from 'react';
import PropTypes from 'prop-types';

class Canvas extends Component {
  static defaultProps = {
    width: 600,
    height: 400,
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }
  render() {
    const { width, height } = this.props;
    const canvasProps = {
      style: {
        width,
        height,
      },
      onMouseMove: (e) => {
        console.log('mousemove', e);
      }
    };
    return (
      <div {...canvasProps}>
        <button>xxx</button>
      </div>
    );
  }
}

export default Canvas;

