import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import findKey from 'lodash/findKey';

import ControlLayer from './ControlLayer';
import * as VComponents from '../../../visual-components';
import Store from '../../store/';

import styles from './SketchBoard.css';

export default class SketchBoard extends Component {
  static defaultProps = {
    width: 600,
    height: 400,
    onDimensionUpdate() {},
    setFocus() {},
    schemaData: [],
    activeComponent: null,
    focusComponent: null,
    setActiveComponent() {},
    startDragging() {},
    stopDragging() {},
    removeComponent() {},
    dragging: false,
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onDimensionUpdate: PropTypes.func,
    setFocus: PropTypes.func,
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    focusComponent: PropTypes.string,
    setActiveComponent: PropTypes.func,
    startDragging: PropTypes.func,
    stopDragging: PropTypes.func,
    removeComponent: PropTypes.func,
    dragging: PropTypes.bool,
  }
  componentRefs = {}
  dockerRefs = {}
  componentDidMount() {
    this.handleUpdate();
  }
  componentDidUpdate(prevProps) {
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.handleUpdate();
    }
  }
  handleUpdate() {
    const rect = this.el.getBoundingClientRect();
    this.props.onDimensionUpdate({
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    });
  }
  handleMouseOver = (e) => {
    const { setFocus } = this.props;
    let element = e.target;
    let matchComponentId;
    let isDockerMatch = false;
    while (element !== this.el) {
      matchComponentId = findKey(this.componentRefs, node => (node === element));
      if (matchComponentId) break;
      matchComponentId = findKey(this.dockerRefs, node => (node === element));
      if (matchComponentId) {
        isDockerMatch = true;
        break;
      }
      element = element.parentElement;
    }
    // console.log('matchComponentId', matchComponentId, isDockerMatch);
    if (matchComponentId) {
      setFocus(matchComponentId, isDockerMatch ? 'INSERT' : 'APPEND');
    } else {
      setFocus(matchComponentId, 'APPEND');
    }
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
      focusComponent,
      dragging,
      setActiveComponent,
      startDragging,
      stopDragging,
    } = this.props;
    return components.map((c) => {
      const View = VComponents[c.component].PrototypeView;
      const viewProps = {
        id: c.id,
        ...c.props,
        store: new Store(c),
        dockerRef: el => (this.dockerRefs[c.id] = el),
      };
      const innerContent = this.renderComponents(c.children);
      const active = activeComponent === c.id;
      const focus = focusComponent === c.id;
      const isCurrentDragComponent = dragging && active;
      const dragProps = {
        key: c.id,
        position: { x: 0, y: 0 },
        onStart() {
          if (!active) {
            setActiveComponent(c.id);
          }
          startDragging();
        },
        onStop() {
          stopDragging();
        },
        handle: `.control-handler-${c.id}`,
        disabled: dragging && !active,
      };
      const controlProps = {
        id: c.id,
        componentRef: el => (this.componentRefs[c.id] = el),
        active,
        focus,
        dragging: isCurrentDragComponent,
        handleClick(e) {
          e.stopPropagation();
          if (!active) {
            setActiveComponent(c.id);
          }
        },
        handleControlClick: this.handleControlClick.bind(this, c.id),
      };
      return (
        <Draggable {...dragProps}>
          <ControlLayer {...controlProps}>
            <View {...viewProps}>
              {innerContent}
            </View>
          </ControlLayer>
        </Draggable>
      );
    });
  }
  renderSchema() {
    const { schemaData } = this.props;
    // this.componentRefs = {};
    return this.renderComponents(schemaData);
  }
  render() {
    const { width, height } = this.props;
    const props = {
      className: classnames(styles.SketchBoard),
      style: {
        width,
        height,
      },
      ref: node => (this.el = node),
      onMouseOver: this.handleMouseOver,
    };
    return (
      <div {...props}>
        {this.renderSchema()}
      </div>
    );
  }
}
