import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Draggable from 'react-draggable';
import findKey from 'lodash/findKey';
import isEqual from 'lodash/isEqual';

import ControlLayer from './ControlLayer';
import * as VComponents from '../../../visual-components';
import Store from '../../store/';

import styles from './SketchBoard.css';

export default class SketchBoard extends Component {
  static defaultProps = {
    setFocus() {},
    schemaData: [],
    activeComponent: null,
    focusComponent: null,
    setActiveComponent() {},
    startDragging() {},
    stopDragging() {},
    removeComponent() {},
    dragging: false,
    screenSize: undefined,
    setMouseIn() {},
    setMouseOut() {},
  }
  static propTypes = {
    setFocus: PropTypes.func,
    schemaData: PropTypes.array,
    activeComponent: PropTypes.string,
    focusComponent: PropTypes.string,
    setActiveComponent: PropTypes.func,
    startDragging: PropTypes.func,
    stopDragging: PropTypes.func,
    removeComponent: PropTypes.func,
    dragging: PropTypes.bool,
    screenSize: PropTypes.arrayOf(PropTypes.number),
    setMouseIn: PropTypes.func,
    setMouseOut: PropTypes.func,
  }
  componentRefs = {}
  dockerRefs = {}
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
  handleMouseEnter = () => {
    this.props.setMouseIn();
  }
  handleMouseLeave = () => {
    this.props.setMouseOut();
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
    this.componentRefs = {};
    this.dockerRefs = {};
    return this.renderComponents(schemaData);
  }
  render() {
    const { screenSize } = this.props;
    const props = {
      className: classnames(styles.SketchBoard),
      style: {
        width: screenSize[0],
        height: screenSize[1],
      },
      ref: node => (this.el = node),
      onMouseOver: this.handleMouseOver,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };
    return (
      <div {...props}>
        {this.renderSchema()}
      </div>
    );
  }
}
