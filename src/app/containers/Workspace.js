import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';

import { sketchAction, schemaAction } from '../actions/';
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
    startDrag() {},
    stopDragAndUpdateSchema() {},
    removeComponent() {},
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
    startDrag: PropTypes.func,
    stopDragAndUpdateSchema: PropTypes.func,
    removeComponent: PropTypes.func,
    screenSize: PropTypes.arrayOf(PropTypes.number),
    setMouseIn: PropTypes.func,
    setMouseOut: PropTypes.func,
  }
  handleStopDrag = () => {
    const {
      activeComponent,
      focusComponent,
      focusType,
      stopDragAndUpdateSchema,
    } = this.props;
    stopDragAndUpdateSchema(activeComponent, focusComponent, focusType);
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
      startDrag,
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
      startDrag,
      stopDrag: this.handleStopDrag,
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
  startDrag: (id) => {
    dispatch(sketchAction.startDrag(id));
  },
  stopDragAndUpdateSchema: (activeComponent, focusComponent, focusType) => {
    dispatch(schemaAction.updateComponent({
      activeComponent,
      focusComponent,
      focusType,
    }));
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
