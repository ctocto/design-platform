import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { batchActions } from 'redux-batched-actions';
import assign from 'lodash/assign';
import uniqueId from 'lodash/uniqueId';

import { schemaAction } from '../actions/';
import ComponentStore from '../components/component-store/';
import ComponentPicker from '../components/component-picker/';
import { selectActiveComponentsIndex } from '../selectors/';

import * as VComponents from '../../visual-components';

const VComponentList = Object.keys(VComponents).map(vname => ({
  name: vname,
  prototype: VComponents[vname].prototype,
  View: VComponents[vname].View,
}));

class PickerPane extends PureComponent {
  static defaultProps = {
    className: '',
    addComponentToSchema() {},
    canvasDimension: undefined,
    activeComponentsIndex: {},
  }
  static propTypes = {
    className: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    addComponentToSchema: PropTypes.func,
    canvasDimension: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    activeComponentsIndex: PropTypes.object,
  }
  renderComponentPicker = ({ name, prototype }) => {
    const { canvasDimension, addComponentToSchema, activeComponentsIndex } = this.props;
    const pickerProps = {
      name,
      prototype,
      key: name,
      canvasDimension,
      addComponentToSchema,
      activeComponentsIndex,
    };
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
    canvasDimension: state.canvasDimension,
    activeComponentsIndex: selectActiveComponentsIndex(state),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addComponentToSchema(payload) {
      dispatch(schemaAction.addComponentToSchema(assign({}, payload, {
        id: uniqueId(payload.componentName),
      })));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickerPane);
