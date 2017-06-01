import 'antd/dist/antd.css';
import Widgets from './containers/Widgets';
import Sider from './containers/Sider';
import Workspace from './containers/Workspace';
import TopBar from './containers/TopBar';

import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <TopBar className={styles.topBar} />
    <Workspace className={styles.workspace} />
    <Widgets className={styles.widgets} />
    <Sider className={styles.sider} />
  </div>
);

export default App;
