import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import get from 'lodash/get';

import { schemaAction } from '../actions/';
import Collector from '../components/collector/';
import Picker from '../components/picker/';
import { selectFocusComponent } from '../selectors/';

import * as VComponents from '../../visual-components';

const VComponentList = Object.keys(VComponents).map(vname => ({
  name: vname,
  prototype: VComponents[vname].prototype,
  View: VComponents[vname].View,
}));

class Widgets extends PureComponent {
  static defaultProps = {
    className: '',
    addComponentToSchema() {},
    sketchDimension: undefined,
    focusComponent: {},
    focusType: null,
  }
  static propTypes = {
    className: PropTypes.string,
    addComponentToSchema: PropTypes.func,
    sketchDimension: PropTypes.shape({
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
  }
  shouldComponentUpdate(nextProps) {
    const pickPropsList = ['sketchDimension'];
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

    addComponentToSchema(assign(componentData, info, {
      id: uniqueId(componentData.componentName),
      componentProps: initialProps,
    }));
  }
  renderPicker = ({ name, prototype }) => {
    const { sketchDimension } = this.props;
    const pickerProps = {
      name,
      prototype,
      key: name,
      sketchDimension,
      addComponent: this.handleAddComponent,
    };
    return <Picker {...pickerProps} />;
  }
  render() {
    const { className } = this.props;
    const props = {
      className,
    };
    return (
      <div {...props}>
        <Collector>
          {
            VComponentList.map(this.renderPicker)
          }
        </Collector>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sketchDimension: state.sketchDimension,
  focusComponent: selectFocusComponent(state),
  focusType: state.sketchStatus.focusType,
});
const mapDispatchToProps = dispatch => ({
  addComponentToSchema(payload) {
    dispatch(schemaAction.addComponentToSchema(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Widgets);