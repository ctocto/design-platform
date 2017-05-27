import Widgets from './containers/Widgets';
import Configs from './containers/Configs';
import Workspace from './containers/Workspace';
import TopBar from './containers/TopBar';

import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <TopBar className={styles.topBar} />
    <Workspace className={styles.workspace} />
    <Widgets className={styles.widgets} />
    <Configs className={styles.configs} />
  </div>
);

export default App;
