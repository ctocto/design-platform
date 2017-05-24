import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';

import { canvasAction, schemaAction } from '../actions/';
import { selectSchema } from '../selectors/';
import Canvas from '../components/canvas';
// import { selectActiveComponents, selectFocusComponent } from '../selectors/';

class Stage extends PureComponent {
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
    const canvasProps = {
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
      <div {...props}><Canvas {...canvasProps} /></div>
    );
  }
}

const mapStateToProps = state => ({
  schemaData: selectSchema(state),
  activeComponent: state.canvasStatus.activeComponent,
  focusComponent: state.canvasStatus.focusComponent,
  focusType: state.canvasStatus.focusType,
  dragging: state.canvasStatus.dragging,
});

const mapDispatchToProps = dispatch => ({
  onDimensionUpdate: (dimension) => {
    dispatch(canvasAction.updateCanvasDimension(dimension));
  },
  setFocusComponent: (id, type) => {
    dispatch(canvasAction.setFocusComponent({
      component: id,
      type,
    }));
  },
  setActiveComponent: (id) => {
    dispatch(canvasAction.setActiveComponent(id));
  },
  startDragging: () => {
    dispatch(canvasAction.startDragging());
  },
  stopDraggingAndUpdateSchema: (activeComponent, focusComponent, focusType) => {
    dispatch(batchActions([
      canvasAction.stopDragging(),
      schemaAction.updateComponent({
        activeComponent,
        focusComponent,
        focusType,
      }),
    ]));
  },
  removeComponent: (id) => {
    dispatch(batchActions([
      canvasAction.setActiveComponent(null),
      schemaAction.removeComponent(id),
    ]));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stage);
