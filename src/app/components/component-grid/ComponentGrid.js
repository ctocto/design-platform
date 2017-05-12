import { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import styles from './ComponentGrid.css';

export default class ComponentGrid extends Component {
  static defaultProps = {
    name: undefined,
    prototype: undefined,
  }
  static propTypes = {
    name: PropTypes.string,
    prototype: PropTypes.object,
  }
  state = {
    x: 0,
    y: 0,
  }
  onDrag = (e, data) => {
    this.setState({
      x: data.x,
      y: data.y,
    });
  }
  onStop = (e, data) => {
    this.setState({
      x: 0,
      y: 0,
    });
  }
  render() {
    const { name, prototype } = this.props;
    const { x, y } = this.state;
    return (
      <div className={styles.grid} key={name}>
        <div className={styles.grid__icon}>{ prototype.icon }</div>
        <p>{prototype.name}</p>
        <Draggable
          position={{x, y}}
          onDrag={this.onDrag}
          onStop={this.onStop}
        >
          <div className={styles.grid__draglayer}></div>
        </Draggable>
      </div>
    );
  }
}