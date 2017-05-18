import PickerPane from './containers/PickerPane';
import RightPane from './containers/RightPane';
import Stage from './containers/Stage';

import styles from './App.css';

const App = () => (
  <div className={styles.workspace}>
    <Stage className={styles.stage} />
    <PickerPane className={styles.pickerPane} />
    <RightPane className={styles.rightPane} />
  </div>
);

export default App;
