import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ComponentStore.css';

export default class ComponentStore extends Component {

  static defaultProps = {
  }
  static propTypes = {
  }
  
  render() {
    return (
      <div className={styles.pane}>
        <div className={styles.pane__body}>
          { this.props.children }
        </div>
      </div>
    );
  }
}