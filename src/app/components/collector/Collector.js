import styles from './Collector.css';

const Collector = ({ children }) => (
  <div className={styles.Collector}>
    <div className={styles.Collector__body}>
      { children }
    </div>
  </div>
);

export default Collector;
