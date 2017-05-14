import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { canvasAction } from '../actions/';
import { isPickerOnCanvas } from '../selectors/';
import Canvas from '../components/canvas';


class Stage extends PureComponent {
  static defaultProps = {
    className: '',
    onDimensionUpdate: () => {},
    pickerOnCanvas: false,
  }
  static propTypes = {
    className: PropTypes.string,
    onDimensionUpdate: PropTypes.func,
    pickerOnCanvas: PropTypes.bool,
  }
  render() {
    const { className, onDimensionUpdate, pickerOnCanvas } = this.props;
    const props = {
      className,
    };
    const canvasProps = {
      onDimensionUpdate,
      pickerOver: pickerOnCanvas,
    };
    return (
      <div {...props}><Canvas {...canvasProps} /></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pickerOnCanvas: isPickerOnCanvas(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDimensionUpdate: (dimension) => {
      dispatch(canvasAction.updateCanvasDimension(dimension));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stage);
