import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectActiveComponent, selectAllComponents } from '../selectors/';
import Configer from '../components/configer/';
import Store from '../store/';

class Configs extends PureComponent {
  static defaultProps = {
    className: '',
    components: {},
    activeComponent: undefined,
  }
  static propTypes = {
    className: PropTypes.string,
    components: PropTypes.object,
    activeComponent: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      pid: PropTypes.string,
      component: PropTypes.string,
      props: PropTypes.object,
    }),
  }
  static contextTypes = {
    store: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.stores = {};
  }
  componentDidMount() {
    this.updateStore();
  }
  componentDidUpdate() {
    this.updateStore();
  }
  updateStore() {
    const { components } = this.props;
    const newStores = {};
    const dispatch = this.context.store.dispatch;
    Object.keys(components).forEach((id) => {
      if (!this.stores[id]) {
        newStores[id] = new Store(components[id], dispatch);
      } else {
        newStores[id] = this.stores[id];
      }
    });
    this.stores = newStores;
  }
  renderConfigers() {
    const { activeComponent } = this.props;
    return (
      <Configer
        componentId={activeComponent.id}
        componentName={activeComponent.component}
        store={this.stores[activeComponent.id]}
      />
    );
  }
  render() {
    const { className } = this.props;
    const props = {
      className,
    };
    return (
      <div {...props}>
        { this.renderConfigers() }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  components: selectAllComponents(state),
  activeComponent: selectActiveComponent(state),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configs);
