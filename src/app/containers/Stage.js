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
    onDimensionUpdate: () => {},
    addFocusComponent: () => {},
    removeFocusComponent: () => {},
    setComponentActive: () => {},
    schemaData: [],
    activeComponent: null,
    focusComponent: null,
    startDragging: () => {},
    stopDraggingAndUpdateSchemaIfNecessary: () => {},
    dragging: false,
  }
  static propTypes = {
    className: PropTypes.string,
    onDimensionUpdate: PropTypes.func,
    addFocusComponent: PropTypes.func,
    removeFocusComponent: PropTypes.func,
    setComponentActive: PropTypes.func,
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    focusComponent:PropTypes.string,
    startDragging: PropTypes.func,
    stopDraggingAndUpdateSchemaIfNecessary: PropTypes.func,
    dragging: PropTypes.bool,
  }
  handleStopDragging = () => {
    const { activeComponent, focusComponent, stopDraggingAndUpdateSchemaIfNecessary } = this.props;
    stopDraggingAndUpdateSchemaIfNecessary(activeComponent, focusComponent);
  }
  render() {
    const {
      className,
      onDimensionUpdate,
      addFocusComponent,
      removeFocusComponent,
      setComponentActive,
      schemaData,
      activeComponent,
      focusComponent,
      startDragging,
      dragging,
    } = this.props;
    const props = {
      className,
    };
    const canvasProps = {
      schemaData,
      onDimensionUpdate,
      setFocus: addFocusComponent,
      setUnfocus: removeFocusComponent,
      setComponentActive,
      activeComponent,
      focusComponent,
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
  dragging: state.canvasStatus.dragging,
});

const mapDispatchToProps = dispatch => ({
  onDimensionUpdate: (dimension) => {
    dispatch(canvasAction.updateCanvasDimension(dimension));
  },
  addFocusComponent: (id) => {
    dispatch(canvasAction.addFocusComponent(id));
  },
  removeFocusComponent: (id) => {
    dispatch(canvasAction.removeFocusComponent(id));
  },
  setComponentActive: (id) => {
    dispatch(canvasAction.addActiveComponent(id));
  },
  startDragging: () => {
    dispatch(canvasAction.startDragging());
  },
  stopDraggingAndUpdateSchemaIfNecessary: (activeComponent, focusComponent) => {
    dispatch(batchActions([
      canvasAction.stopDragging(),
      schemaAction.updateComponentInSchema({
        activeComponent,
        focusComponent,
      }),
    ]));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stage);
