import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { shallowEqual } from 'recompose';

// import styles from './Configer';
import * as VComponents from '../../../visual-components/';


export default class Configer extends PureComponent {
  static defaultProps = {
    component: undefined,
    setProp() {},
    componentIds: [],
  }
  static propTypes = {
    component: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      pid: PropTypes.string,
      component: PropTypes.string,
      props: PropTypes.object,
    }),
    setProp: PropTypes.func,
    componentIds: PropTypes.arrayOf(PropTypes.string),
  }
  static renderConfigBlock = (config, props) => (
    <div key={`c-${config.name}`}>
      <h3>{config.title}</h3>
      <config.setter fields={props} />
    </div>
  )
  shouldComponentUpdate(nextProps) {
    if (
      get(nextProps, ['component', 'id']) === get(this.props, ['component', 'id']) &&
      shallowEqual(
        get(nextProps, ['componentIds']),
        get(this.props, ['componentIds']),
      ) &&
      shallowEqual(
        get(nextProps, ['component', 'props']),
        get(this.props, ['component', 'props']),
      )
    ) {
      return false;
    }
    return true;
  }
  componentDidUpdate(prevProps) {
    const { componentIds } = this.props;
    if (!isEqual(componentIds, prevProps.componentIds)) {
      Object.keys(this.prototypeStore).forEach((id) => {
        if (!componentIds.includes(id)) {
          delete this.prototypeStore[id];
        }
      });
    }
  }
  prototypeStore = {}
  render() {
    const { component, setProp } = this.props;
    const factory = get(VComponents, [
      component.component,
      'prototype',
      'factory',
    ], () => {});
    let prototype;
    if (component && component.id) {
      if (this.prototypeStore[component.id]) {
        prototype = this.prototypeStore[component.id];
      } else {
        prototype = factory(component.id, setProp);
        this.prototypeStore[component.id] = prototype;
      }
    }
    if (!prototype) return null;
    return (
      <div>
        {
          prototype.configers.map(config => Configer.renderConfigBlock(config, component.props))
        }
      </div>
    );
  }
}

