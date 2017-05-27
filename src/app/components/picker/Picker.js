import { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Picker.css';

export default class Picker extends Component {
  static defaultProps = {
    name: undefined,
    prototype: undefined,
    addComponent() {},
    inSketch: false,
  }
  static propTypes = {
    name: PropTypes.string,
    prototype: PropTypes.object,
    addComponent: PropTypes.func,
    inSketch: PropTypes.bool,
  }
  onStop = () => {
    const { inSketch, name } = this.props;
    if (inSketch) {
      this.props.addComponent({
        componentName: name,
      });
    }
  }
  render() {
    const { name, prototype } = this.props;
    return (
      <div className={styles.grid} key={name}>
        <div className={styles.grid__icon}>{ prototype.icon }</div>
        <p>{prototype.name}</p>
        <Draggable
          position={{ x: 0, y: 0 }}
          onStart={this.onStart}
          onStop={this.onStop}
          offsetParent={document.documentElement}
          defaultClassNameDragging={styles['grid__draglayer--dragging']}
        >
          <div className={classnames(styles.grid__draglayer)} />
        </Draggable>
      </div>
    );
  }
}
