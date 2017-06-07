import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withContext } from 'recompose';

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
    stopDrag() {},
    removeComponent() {},
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
    stopDrag: PropTypes.func,
    removeComponent: PropTypes.func,
    screenSize: PropTypes.arrayOf(PropTypes.number),
    setMouseIn: PropTypes.func,
    setMouseOut: PropTypes.func,
  }
  handleMouseOver = (e) => {
    const { setFocus } = this.props;
    let element = e.target;
    let matchComponentId;
    let isDockerMatch = false;
    while (element !== this.el) {
      if (element.dataset.cid) {
        matchComponentId = element.dataset.cid;
      }
      if (matchComponentId) break;
      if (element.dataset.dockerId) {
        matchComponentId = element.dataset.dockerId;
      }
      if (matchComponentId) {
        isDockerMatch = true;
        break;
      }
      element = element.parentElement;
    }
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
      case 'drag':
        this.props.setActiveComponent(id);
        break;
      default:
        break;
    }
  }
  renderComponents(components) {
    const {
      activeComponent,
      focusComponent,
      setActiveComponent,
      stopDrag,
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
      const focus = focusComponent === c.id;
      const controlProps = {
        key: c.id,
        id: c.id,
        active,
        focus,
        handleClick(e) {
          e.stopPropagation();
          if (!active) {
            setActiveComponent(c.id);
          }
        },
        handleDragStart() {
          if (!active) {
            setActiveComponent(c.id);
          }
        },
        handleDragStop() {
          stopDrag();
        },
        handleControlClick: this.handleControlClick.bind(this, c.id),
      };
      const EnhanceView = withContext(
        {
          id: PropTypes.string,
          focus: PropTypes.bool,
        },
        () => ({
          id: c.id,
          focus,
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
