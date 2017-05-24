import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ControlLayer.css';
import Drag from './drag.svg';
import Delete from './delete.svg';

const ControlLayer = ({
  id,
  active,
  focus,
  dragging,
  className,
  componentRef,
  handleClick,
  children,
  handleControlClick,
  ...otherProps
}) => {
  const handleClickDeleteBtn = (e) => {
    e.stopPropagation();
    handleControlClick('delete');
  };

  const props = {
    ref: componentRef,
    className: classnames(className, styles.Layer__wrapper, {
      [styles['Layer__wrapper--active']]: active,
      [styles['Layer__wrapper--focus']]: focus,
      [styles['Layer__wrapper--dragging']]: dragging,
    }),
    onClick: handleClick,
    ...otherProps,
  };
  return (
    <div {...props}>
      <button
        className={classnames(
          styles.Layer__controlBtn,
          styles.Layer__deleteBtn,
        )}
        onClick={handleClickDeleteBtn}
      >
        <Delete width={16} height={16} />
      </button>
      <button
        className={classnames(
          `control-handler-${id}`,
          styles.Layer__controlBtn,
          styles.Layer__dragControl,
        )}
      >
        <Drag width={16} height={16} />
      </button>
      {children}
    </div>
  );
};

ControlLayer.defaultProps = {
  id: undefined,
  active: false,
  focus: false,
  dragging: false,
  className: '',
  componentRef() {},
  handleClick() {},
  handleControlClick() {},
};
ControlLayer.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  focus: PropTypes.bool,
  dragging: PropTypes.bool,
  className: PropTypes.string,
  componentRef: PropTypes.func,
  handleClick: PropTypes.func,
  handleControlClick: PropTypes.func,
};

export default ControlLayer;
