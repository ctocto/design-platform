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
    setActiveComponent() {},
    schemaData: [],
    activeComponent: null,
    updateComponent() {},
    removeComponent() {},
    screenSize: undefined,
  }
  static propTypes = {
    className: PropTypes.string,
    setActiveComponent: PropTypes.func,
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    updateComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    screenSize: PropTypes.arrayOf(PropTypes.number),
  }
  render() {
    const {
      className,
      setActiveComponent,
      schemaData,
      activeComponent,
      removeComponent,
      updateComponent,
      screenSize,
    } = this.props;
    const props = {
      className,
    };
    const sketchBoardProps = {
      schemaData,
      setActiveComponent,
      activeComponent,
      removeComponent,
      updateComponent,
      screenSize,
    };
    return (
      <div {...props}><SketchBoard {...sketchBoardProps} /></div>
    );
  }
}

const mapStateToProps = state => ({
  schemaData: selectSchema(state),
  activeComponent: state.sketch.activeComponent,
  screenSize: selectDeviceResolution(state),
});

const mapDispatchToProps = dispatch => ({
  setActiveComponent: (id) => {
    dispatch(sketchAction.setActiveComponent(id));
  },
  updateComponent: (payload) => {
    dispatch(schemaAction.updateComponent(payload));
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
