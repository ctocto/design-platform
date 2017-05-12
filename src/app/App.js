import { Component } from 'react';

import LeftPane from './layout/LeftPane';
import RightPane from './layout/RightPane';
import Stage from './layout/Stage';

import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.workspace}>
        <Stage className={styles.stage} />
        <LeftPane className={styles.leftPane} />
        <RightPane className={styles.rightPane} />
      </div>
    );
  }
}

export default App;