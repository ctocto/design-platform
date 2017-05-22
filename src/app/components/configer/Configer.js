import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import styles from './Configer';
import Store from '../../store/';
import * as VComponents from '../../../visual-components/';

export default class Configer extends Component {
  static defaultProps = {
    componentId: undefined,
    componentName: undefined,
    store: undefined,
  }
  static propTypes = {
    componentId: PropTypes.string,
    componentName: PropTypes.string,
    store: PropTypes.instanceOf(Store),
  }
  handleChange(name, value) {
    this.props.store.setProp(name, value);
  }
  renderConfigBlock = config => (
    <div key={config.name}>
      <h3>{config.title}</h3>
      {
        cloneElement(config.setter, {
          onChange: this.handleChange.bind(this, config.name),
          value: this.props.store.getProp(config.name),
        })
      }
    </div>
  )
  render() {
    const { componentName } = this.props;
    const configers = get(VComponents, [
      componentName,
      'prototype',
      'configers',
    ], []);
    return <div>{configers.map(this.renderConfigBlock)}</div>;
  }
}

