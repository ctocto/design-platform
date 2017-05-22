import PickerPane from './containers/PickerPane';
import ConfigPane from './containers/ConfigPane';
import Stage from './containers/Stage';

import styles from './App.css';

const App = () => (
  <div className={styles.workspace}>
    <Stage className={styles.stage} />
    <PickerPane className={styles.pickerPane} />
    <ConfigPane className={styles.configPane} />
  </div>
);

export default App;
