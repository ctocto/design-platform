import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { canvasAction } from '../actions/';
import { selectSchema } from '../selectors/';
import Canvas from '../components/canvas';
import { selectActiveComponentsIndex } from '../selectors/';

class Stage extends PureComponent {
  static defaultProps = {
    className: '',
    onDimensionUpdate: () => {},
    addActiveComponent: () => {},
    removeActiveComponent: () => {},
    schemaData: [],
    activeComponentsIndex: {},
    startDragging: () => {},
    stopDragging: () => {},
    dragging: false,
  }
  static propTypes = {
    className: PropTypes.string,
    onDimensionUpdate: PropTypes.func,
    addActiveComponent: PropTypes.func,
    removeActiveComponent: PropTypes.func,
    schemaData: PropTypes.array,
    activeComponentsIndex: PropTypes.object,
    startDragging: PropTypes.func,
    stopDragging: PropTypes.func,
    dragging: PropTypes.bool,
  }
  render() {
    const {
      className,
      onDimensionUpdate,
      addActiveComponent,
      removeActiveComponent,
      schemaData,
      activeComponentsIndex,
      startDragging,
      stopDragging,
      dragging,
    } = this.props;
    const props = {
      className,
    };
    const canvasProps = {
      schemaData,
      onDimensionUpdate,
      setActive: addActiveComponent,
      setInactive: removeActiveComponent,
      activeComponentsIndex,
      startDragging,
      stopDragging,
      dragging,
    };
    return (
      <div {...props}><Canvas {...canvasProps} /></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schemaData: selectSchema(state),
    activeComponentsIndex: selectActiveComponentsIndex(state),
    dragging: state.canvasStatus.dragging,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDimensionUpdate: (dimension) => {
      dispatch(canvasAction.updateCanvasDimension(dimension));
    },
    addActiveComponent: (id) => {
      dispatch(canvasAction.addActiveComponent(id));
    },
    removeActiveComponent: (id) => {
      dispatch(canvasAction.removeActiveComponent(id));
    },
    startDragging: () => {
      dispatch(canvasAction.startDragging());
    },
    stopDragging: () => {
      dispatch(canvasAction.stopDragging());
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stage);
