import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import styles from './Configer';
import * as VComponents from '../../../visual-components/';

export default class Configer extends Component {
  static defaultProps = {
    component: undefined,
    setProp() {},
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
  }
  handleChange(name, value) {
    const { component, setProp } = this.props;
    setProp({
      id: component.id,
      nextProps: {
        [name]: value,
      },
    });
  }
  renderConfigBlock = (config) => {
    const { component } = this.props;
    return (
      <div key={config.name}>
        <h3>{config.title}</h3>
        {
          cloneElement(config.setter, {
            onChange: this.handleChange.bind(this, config.name),
            value: component.props[config.name],
          })
        }
      </div>
    );
  }
  render() {
    const { component } = this.props;
    const configers = get(VComponents, [
      component.component,
      'prototype',
      'configers',
    ], []);
    return <div>{configers.map(this.renderConfigBlock)}</div>;
  }
}

