import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { batchActions } from 'redux-batched-actions';

import { schemaAction, sketchAction } from '../actions/';
import Collector from '../components/collector/';
import Picker from '../components/picker/';
// import { selectFocusComponent } from '../selectors/';

import * as VComponents from '../../visual-components';

const VComponentList = Object.keys(VComponents).map(vname => ({
  name: vname,
  meta: VComponents[vname].prototype.meta,
  View: VComponents[vname].View,
}));

class Widgets extends PureComponent {
  static defaultProps = {
    className: '',
    addComponentToSchema() {},
    // focusType: null,
    // mouseInSketch: false,
  }
  static propTypes = {
    className: PropTypes.string,
    addComponentToSchema: PropTypes.func,
    // focusType: PropTypes.oneOf(['INSERT', 'APPEND']),
    // mouseInSketch: PropTypes.bool,
  }
  shouldComponentUpdate(nextProps) {
    return !isEqual(
      pick(nextProps, ['className']),
      pick(this.props, ['className']),
    );
  }
  handleAddComponent = ({ componentName, target, id, status }) => {
    
    const { addComponentToSchema } = this.props;
    const info = {
      pid: null,
      // index: -1,
      componentName,
    };
    if (target === 'root') {
      // nothing
    } else {
      if (status === 'OVER') {
        assign(info, {

        });
      } else if (status === 'INSIDE') {

      }
      // if (focusComponent.id) {
      //   if (focusType === 'INSERT') {
      //     assign(info, {
      //       pid: focusComponent.id,
      //     });
      //   } else {
      //     assign(info, {
      //       pid: focusComponent.pid,
      //       index: focusComponent.index + 1,
      //     });
      //   }
      // }
    }
    const configers = get(VComponents, [
      componentName,
      'prototype',
      'configers',
    ], []);
    const initialProps = {};
    configers.forEach((config) => {
      assign(initialProps, {
        [config.name]: config.defaultValue,
      });
    });

    addComponentToSchema(assign(info, {
      id: uniqueId(componentName),
      componentProps: initialProps,
    }));
  }
  renderPicker = ({ name, meta }) => {
    // const { mouseInSketch } = this.props;
    const pickerProps = {
      name,
      meta,
      key: name,
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
  // focusComponent: selectFocusComponent(state),
  // focusType: state.sketch.focusType,
  // mouseInSketch: state.sketch.mouseIn,
});
const mapDispatchToProps = dispatch => ({
  addComponentToSchema(payload) {
    dispatch(
      batchActions([
        schemaAction.addComponentToSchema(payload),
        sketchAction.setActiveComponent(payload.id),
      ]),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Widgets);
