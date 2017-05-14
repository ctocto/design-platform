import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'lodash/assign';

import { pickerAction } from '../actions/';
import ComponentStore from '../components/component-store/';
import ComponentPicker from '../components/component-picker/';
import { isPickerOnCanvas } from '../selectors/';

import * as VComponents from '../../visual-components';

const VComponentList = Object.keys(VComponents).map(vname => ({
  name: vname,
  prototype: VComponents[vname].prototype,
  View: VComponents[vname].View,
}));

class StorePane extends PureComponent {
  static defaultProps = {
    className: '',
    currentPicker: undefined,
    position: {
      x: 0,
      y: 0,
    },
    pickStart() {},
    pickEnd() {},
    updatePickerPosition() {},
    pickerInCanvas: false,
  }
  static propTypes = {
    className: PropTypes.string,
    currentPicker: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    pickStart: PropTypes.func,
    pickEnd: PropTypes.func,
    updatePickerPosition: PropTypes.func,
    pickerInCanvas: PropTypes.bool,
  }
  renderComponentPicker = ({ name, prototype }) => {
    const { currentPicker, position, pickStart, pickEnd, updatePickerPosition, pickerInCanvas } = this.props;
    const pickerProps = {
      name,
      prototype,
      key: name,
      pickStart,
      pickEnd,
    };
    if (name === currentPicker) {
      assign(pickerProps, {
        updatePickerPosition,
        position,
        pickerInCanvas,
      });
    }
    return <ComponentPicker {...pickerProps} />
  }
  render() {
    const { className } = this.props;
    const props = {
      className,
    };
    return (
      <div {...props}>
        <ComponentStore>
          {
            VComponentList.map(this.renderComponentPicker)
          }
        </ComponentStore>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPicker: state.currentPicker.picker,
    position: state.pickerPositon,
    pickerInCanvas: isPickerOnCanvas(state),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    pickStart(picker, originPos) {
      dispatch(pickerAction.startDragPicker({
        picker,
        originPos,
      }));
    },
    pickEnd(picker){
      dispatch(pickerAction.finishDragPicker(picker));
    },
    updatePickerPosition(position) {
      dispatch(pickerAction.updatePickerPosition(position))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePane);
