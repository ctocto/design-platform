import { Component } from 'react';

import StorePane from './layout/StorePane';
import RightPane from './layout/RightPane';
import Stage from './layout/Stage';

import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.workspace}>
        <Stage className={styles.stage} />
        <StorePane className={styles.storePane} />
        <RightPane className={styles.rightPane} />
      </div>
    );
  }
}

export default App;
