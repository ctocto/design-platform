import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withContext } from 'recompose';
import { DropTarget } from 'react-dnd';

import ControlLayer from './ControlLayer';
import * as VComponents from '../../../visual-components';
import Store from '../../store/';
import { DndTypes } from '../../constants';

import styles from './SketchBoard.css';

class SketchBoard extends Component {
  static defaultProps = {
    schemaData: [],
    activeComponent: null,
    setActiveComponent() {},
    updateComponent() {},
    removeComponent() {},
    screenSize: undefined,
    connectClassDropTarget() {},
    connectInstanceDropTarget() {},
  }
  static propTypes = {
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    setActiveComponent: PropTypes.func,
    updateComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    screenSize: PropTypes.arrayOf(PropTypes.number),
    connectClassDropTarget: PropTypes.func,
    connectInstanceDropTarget: PropTypes.func,
  }
  handleControlClick(id, type) {
    switch (type) {
      case 'delete':
        this.props.removeComponent(id);
        break;
      default:
        break;
    }
  }
  renderComponents(components) {
    const {
      activeComponent,
      setActiveComponent,
      updateComponent,
    } = this.props;
    return components.map((c) => {
      const View = VComponents[c.component].PrototypeView;
      const viewProps = {
        id: c.id,
        // ...c.props,
        store: new Store(c),
      };
      const innerContent = this.renderComponents(c.children);
      const active = activeComponent === c.id;
      const controlProps = {
        key: c.id,
        id: c.id,
        active,
        handleClick(e) {
          e.stopPropagation();
          if (!active) {
            setActiveComponent(c.id);
          }
        },
        updateComponent,
        setActiveComponent,
        handleControlClick: this.handleControlClick.bind(this, c.id),
      };
      const EnhanceView = withContext(
        {
          id: PropTypes.string,
        },
        () => ({
          id: c.id,
        }),
      )(View);
      return (
        <ControlLayer {...controlProps}>
          <EnhanceView {...viewProps}>
            {innerContent}
          </EnhanceView>
        </ControlLayer>
      );
    });
  }
  renderSchema() {
    const { schemaData } = this.props;
    return this.renderComponents(schemaData);
  }
  render() {
    const { screenSize, connectClassDropTarget, connectInstanceDropTarget } = this.props;
    const props = {
      className: classnames(styles.SketchBoard),
      style: {
        width: screenSize[0],
        height: screenSize[1],
      },
      ref: node => (this.el = node),
    };
    return connectClassDropTarget(connectInstanceDropTarget(
      <div {...props}>
        {this.renderSchema()}
      </div>
    ));
  }
}

const classTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      return {
        target: 'root',
      };
    }
  },
};

const instanceTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      return {
        target: 'root',
        id: null,
        status: 'OVER',
      };
    }
  },
};

export default DropTarget(
  DndTypes.CLASS,
  classTarget,
  connect => ({
    connectClassDropTarget: connect.dropTarget(),
  }),
)(DropTarget(
  DndTypes.INSTANCE,
  instanceTarget,
  connect => ({
    connectInstanceDropTarget: connect.dropTarget(),
  }),
)(SketchBoard));
