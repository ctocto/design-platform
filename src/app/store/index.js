/**
 * the communication interface for VComponents & Setter
 */
import { schemaAction } from '../actions/';

export default class Store {
  constructor(component, dispatch) {
    this.component = component;
    this.dispatch = dispatch;
  }
  /**
   * get prop value by name
   * @param {string} name prop's key
   */
  getProp(name) {
    return this.component.props[name];
  }
  /**
   * set prop
   * @param {string} name prop's key
   * @param {*} value prop's value
   */
  setProp(name, value) {
    this.dispatch(schemaAction.updateComponentProps({
      id: this.component.id,
      nextProps: {
        [name]: value,
      },
    }));
  }
  /**
   * get all props
   */
  getProps() {
    return this.component.props;
  }
}
