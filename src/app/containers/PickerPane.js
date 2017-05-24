import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { batchActions } from 'redux-batched-actions';
import assign from 'lodash/assign';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import get from 'lodash/get';

import { schemaAction } from '../actions/';
import ComponentStore from '../components/component-store/';
import ComponentPicker from '../components/component-picker/';
import { selectFocusComponent } from '../selectors/';

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
    focusComponent: {},
    focusType: null,
    // activeDocker: null,
  }
  static propTypes = {
    className: PropTypes.string,
    addComponentToSchema: PropTypes.func,
    canvasDimension: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    focusComponent: PropTypes.shape({
      id: PropTypes.string,
      pid: PropTypes.string,
      index: PropTypes.number,
    }),
    focusType: PropTypes.oneOf(['INSERT', 'APPEND']),
    // activeDocker: PropTypes.shape({
    //   id: PropTypes.string,
    //   index: PropTypes.number,
    // }),
  }
  shouldComponentUpdate(nextProps) {
    const pickPropsList = ['canvasDimension'];
    return !isEqual(pick(nextProps, pickPropsList), pick(this.props, pickPropsList));
  }
  handleAddComponent = (componentData) => {
    const { addComponentToSchema, focusComponent, focusType } = this.props;
    const info = {
      pid: null,
      index: -1,
    };
    if (focusComponent.id) {
      if (focusType === 'INSERT') {
        assign(info, {
          pid: focusComponent.id,
        });
      } else {
        assign(info, {
          pid: focusComponent.pid,
          index: focusComponent.index + 1,
        });
      }
    }
    const configers = get(VComponents, [
      componentData.componentName,
      'prototype',
      'configers',
    ], []);
    const initialProps = {};
    configers.forEach((config) => {
      assign(initialProps, {
        [config.name]: config.defaultValue,
      });
    });

    // if (activeDocker) {
    //   assign(info, {
    //     pid: activeDocker.id,
    //     index: activeDocker.index,
    //   });
    // }

    addComponentToSchema(assign(componentData, info, {
      id: uniqueId(componentData.componentName),
      componentProps: initialProps,
    }));
  }
  renderComponentPicker = ({ name, prototype }) => {
    const { canvasDimension } = this.props;
    const pickerProps = {
      name,
      prototype,
      key: name,
      canvasDimension,
      addComponent: this.handleAddComponent,
    };
    return <ComponentPicker {...pickerProps} />;
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

const mapStateToProps = state => ({
  canvasDimension: state.canvasDimension,
  focusComponent: selectFocusComponent(state),
  focusType: state.canvasStatus.focusType,
  // activeDocker: state.canvasStatus.activeDocker,
});
const mapDispatchToProps = dispatch => ({
  addComponentToSchema(payload) {
    dispatch(schemaAction.addComponentToSchema(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickerPane);
