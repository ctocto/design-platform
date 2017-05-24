import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './ControlLayer.css';
import Drag from './drag.svg';
import Delete from './delete.svg';

export default class ControlLayer extends PureComponent {
  static defaultProps = {
    id: undefined,
    active: false,
    focus: false,
    dragging: false,
    className: '',
    componentRef() {},
    handleClick() {},
    handleControlClick() {},
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    focus: PropTypes.bool,
    dragging: PropTypes.bool,
    className: PropTypes.string,
    componentRef: PropTypes.func,
    handleClick: PropTypes.func,
    handleControlClick: PropTypes.func,
  }
  handleClickDeleteBtn = (e) => {
    e.stopPropagation();
    const { handleControlClick } = this.props;
    handleControlClick('delete');
  }
  render() {
    const {
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
    } = this.props;
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
          onClick={this.handleClickDeleteBtn}
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
  }
}
