import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Picker.css';

const Picker = ({
  inSketch,
  name,
  addComponent,
  meta,
}) => {
  const onStop = () => {
    if (inSketch) {
      addComponent({
        componentName: name,
      });
    }
  };
  return (
    <div className={styles.grid} key={name}>
      <div className={styles.grid__icon}>{ meta.icon }</div>
      <p>{meta.name}</p>
      <Draggable
        position={{ x: 0, y: 0 }}
        onStop={onStop}
        offsetParent={document.documentElement}
        defaultClassNameDragging={styles['grid__draglayer--dragging']}
      >
        <div className={classnames(styles.grid__draglayer)} />
      </Draggable>
    </div>
  );
};

Picker.defaultProps = {
  name: undefined,
  meta: undefined,
  addComponent() {},
  inSketch: false,
};
Picker.propTypes = {
  name: PropTypes.string,
  meta: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.node,
  }),
  addComponent: PropTypes.func,
  inSketch: PropTypes.bool,
};

export default Picker;
