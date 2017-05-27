import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';

import { sketchAction, schemaAction, deviceAction } from '../actions/';
import { selectSchema, selectDeviceResolution } from '../selectors/';
import SketchBoard from '../components/sketch-board/';

class Workspace extends PureComponent {
  static defaultProps = {
    className: '',
    setFocusComponent() {},
    setActiveComponent() {},
    schemaData: [],
    activeComponent: null,
    focusComponent: null,
    focusType: null,
    startDragging() {},
    stopDraggingAndUpdateSchema() {},
    removeComponent() {},
    dragging: false,
    screenSize: undefined,
    setMouseIn() {},
    setMouseOut() {},
  }
  static propTypes = {
    className: PropTypes.string,
    setFocusComponent: PropTypes.func,
    setActiveComponent: PropTypes.func,
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    focusComponent: PropTypes.string,
    focusType: PropTypes.oneOf(['APPEND', 'INSERT']),
    startDragging: PropTypes.func,
    stopDraggingAndUpdateSchema: PropTypes.func,
    removeComponent: PropTypes.func,
    dragging: PropTypes.bool,
    screenSize: PropTypes.arrayOf(PropTypes.number),
    setMouseIn: PropTypes.func,
    setMouseOut: PropTypes.func,
  }
  handleStopDragging = () => {
    const {
      activeComponent,
      focusComponent,
      focusType,
      stopDraggingAndUpdateSchema,
    } = this.props;
    stopDraggingAndUpdateSchema(activeComponent, focusComponent, focusType);
  }
  render() {
    const {
      className,
      setFocusComponent,
      setActiveComponent,
      schemaData,
      activeComponent,
      focusComponent,
      removeComponent,
      startDragging,
      dragging,
      screenSize,
      setMouseIn,
      setMouseOut,
    } = this.props;
    const props = {
      className,
    };
    const sketchBoardProps = {
      schemaData,
      setFocus: setFocusComponent,
      setActiveComponent,
      activeComponent,
      focusComponent,
      removeComponent,
      startDragging,
      stopDragging: this.handleStopDragging,
      dragging,
      screenSize,
      setMouseIn,
      setMouseOut,
    };
    return (
      <div {...props}><SketchBoard {...sketchBoardProps} /></div>
    );
  }
}

const mapStateToProps = state => ({
  schemaData: selectSchema(state),
  activeComponent: state.sketch.activeComponent,
  focusComponent: state.sketch.focusComponent,
  focusType: state.sketch.focusType,
  dragging: state.sketch.dragging,
  screenSize: selectDeviceResolution(state),
});

const mapDispatchToProps = dispatch => ({
  setFocusComponent: (id, type) => {
    dispatch(sketchAction.setFocusComponent({
      component: id,
      type,
    }));
  },
  setActiveComponent: (id) => {
    dispatch(sketchAction.setActiveComponent(id));
  },
  startDragging: () => {
    dispatch(sketchAction.startDragging());
  },
  stopDraggingAndUpdateSchema: (activeComponent, focusComponent, focusType) => {
    dispatch(batchActions([
      sketchAction.stopDragging(),
      schemaAction.updateComponent({
        activeComponent,
        focusComponent,
        focusType,
      }),
    ]));
  },
  removeComponent: (id) => {
    dispatch(batchActions([
      sketchAction.setActiveComponent(null),
      schemaAction.removeComponent(id),
    ]));
  },
  setMouseIn: () => {
    dispatch(sketchAction.setMouseIn());
  },
  setMouseOut: () => {
    dispatch(sketchAction.setMouseOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);
