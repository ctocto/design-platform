import { Component } from 'react';
import * as VComponents from '../../../visual-components';
import ComponentGrid from '../component-grid/';

import styles from './ComponentPane.css';

const VComponentList = Object.keys(VComponents).map(vname => ({
  name: vname,
  prototype: VComponents[vname].prototype,
  View: VComponents[vname].View,
}));

export default class ComponentPane extends Component {
  
  static renderComponentGrid = ({ name, prototype }) => {
    const gridProps = {
      name,
      prototype,
      key: name,
    };
    return <ComponentGrid {...gridProps} />
  }
  render() {
    return (
      <div className={styles.pane}>
        <div className={styles.pane__body}>
          {
            VComponentList.map(ComponentPane.renderComponentGrid)
          }
        </div>
      </div>
    );
  }
}