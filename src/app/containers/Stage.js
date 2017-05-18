import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { canvasAction } from '../actions/';
import { isPickerOnCanvas, selectSchema } from '../selectors/';
import Canvas from '../components/canvas';


class Stage extends PureComponent {
  static defaultProps = {
    className: '',
    currentPicker: undefined,
    onDimensionUpdate: () => {},
    pickerOnCanvas: false,
    schemaData: {},
  }
  static propTypes = {
    className: PropTypes.string,
    currentPicker: PropTypes.string,
    onDimensionUpdate: PropTypes.func,
    pickerOnCanvas: PropTypes.bool,
    schemaData: PropTypes.object,
  }
  render() {
    const { className, currentPicker, onDimensionUpdate, pickerOnCanvas, schemaData } = this.props;
    const props = {
      className,
    };
    const canvasProps = {
      onDimensionUpdate,
      currentPicker,
      pickerOver: pickerOnCanvas,
      schemaData,
    };
    return (
      <div {...props}><Canvas {...canvasProps} /></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPicker: state.currentPicker.picker,
    pickerOnCanvas: isPickerOnCanvas(state),
    schemaData: selectSchema(state),
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
