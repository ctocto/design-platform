import 'antd/dist/antd.css';
import { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Widgets from './containers/Widgets';
import Sider from './containers/Sider';
import Workspace from './containers/Workspace';
import TopBar from './containers/TopBar';

import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <TopBar className={styles.topBar} />
        <Workspace className={styles.workspace} />
        <Widgets className={styles.widgets} />
        <Sider className={styles.sider} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
