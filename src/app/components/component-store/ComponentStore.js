import styles from './ComponentStore.css';

const ComponentStore = ({ children }) => (
  <div className={styles.pane}>
    <div className={styles.pane__body}>
      { children }
    </div>
  </div>
);

export default ComponentStore;
