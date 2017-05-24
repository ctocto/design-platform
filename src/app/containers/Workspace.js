import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';

import { sketchAction, schemaAction } from '../actions/';
import { selectSchema } from '../selectors/';
import SketchBoard from '../components/sketch-board/';

class Workspace extends PureComponent {
  static defaultProps = {
    className: '',
    onDimensionUpdate() {},
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
  }
  static propTypes = {
    className: PropTypes.string,
    onDimensionUpdate: PropTypes.func,
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
      onDimensionUpdate,
      setFocusComponent,
      setActiveComponent,
      schemaData,
      activeComponent,
      focusComponent,
      removeComponent,
      startDragging,
      dragging,
    } = this.props;
    const props = {
      className,
    };
    const sketchBoardProps = {
      schemaData,
      onDimensionUpdate,
      setFocus: setFocusComponent,
      setActiveComponent,
      activeComponent,
      focusComponent,
      removeComponent,
      startDragging,
      stopDragging: this.handleStopDragging,
      dragging,
    };
    return (
      <div {...props}><SketchBoard {...sketchBoardProps} /></div>
    );
  }
}

const mapStateToProps = state => ({
  schemaData: selectSchema(state),
  activeComponent: state.sketchStatus.activeComponent,
  focusComponent: state.sketchStatus.focusComponent,
  focusType: state.sketchStatus.focusType,
  dragging: state.sketchStatus.dragging,
});

const mapDispatchToProps = dispatch => ({
  onDimensionUpdate: (dimension) => {
    dispatch(sketchAction.updateSketchDimension(dimension));
  },
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);
