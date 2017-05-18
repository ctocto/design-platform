import { Component } from 'react';
import styles from './View.css';

export default class BaseView extends Component {
  render() {
    return (
      <div className={styles.Component__wrapper}>
        <div className={styles.Component__actionCover}></div>
        {this.renderView()}
      </div>
    );
  }
}
