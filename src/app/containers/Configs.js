import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectActiveComponent } from '../selectors/';
import Configer from '../components/configer/';
import { schemaAction } from '../actions/';

class Configs extends PureComponent {
  static defaultProps = {
    className: '',
    activeComponent: undefined,
    updateComponentProps() {},
  }
  static propTypes = {
    className: PropTypes.string,
    activeComponent: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      pid: PropTypes.string,
      component: PropTypes.string,
      props: PropTypes.object,
    }),
    updateComponentProps: PropTypes.func,
  }
  static contextTypes = {
    store: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.stores = {};
  }
  renderConfigers() {
    const { activeComponent, updateComponentProps } = this.props;
    return (
      <Configer
        component={activeComponent}
        setProp={updateComponentProps}
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
  activeComponent: selectActiveComponent(state),
});

const mapDispatchToProps = dispatch => ({
  updateComponentProps: payload => dispatch(schemaAction.updateComponentProps(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configs);
