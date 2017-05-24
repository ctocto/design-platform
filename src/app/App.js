import Widgets from './containers/Widgets';
import Configs from './containers/Configs';
import Workspace from './containers/Workspace';

import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <Workspace className={styles.workspace} />
    <Widgets className={styles.widgets} />
    <Configs className={styles.configs} />
  </div>
);

export default App;
