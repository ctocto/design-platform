import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from 'antd/lib/tabs';

import { selectActiveComponent, selectAllComponents, selectSchema } from '../selectors/';
import Configer from '../components/configer/';
import Overview from '../components/overview/';
import { schemaAction, sketchAction } from '../actions/';

const { TabPane } = Tabs;

class Sider extends PureComponent {
  static defaultProps = {
    className: '',
    activeComponent: undefined,
    updateComponentProps() {},
    components: {},
    schema: undefined,
    setActiveComponent() {},
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
    components: PropTypes.object,
    schema: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.string,
      id: PropTypes.string,
      props: PropTypes.object,
    })),
    setActiveComponent: PropTypes.func,
  }
  static contextTypes = {
    store: PropTypes.object,
  }
  renderConfigers() {
    const { activeComponent, updateComponentProps, components } = this.props;
    return (
      <Configer
        component={activeComponent}
        setProp={updateComponentProps}
        componentIds={Object.keys(components)}
      />
    );
  }
  renderOverview() {
    const { activeComponent, setActiveComponent } = this.props;
    return (
      <Overview
        data={this.props.schema}
        activeComponentId={activeComponent && activeComponent.id}
        onActive={setActiveComponent}
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
        <Tabs defaultActiveKey="configer">
          <TabPane tab="配置" key="configer">{this.renderConfigers()}</TabPane>
          <TabPane tab="概览" key="overview">{this.renderOverview()}</TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeComponent: selectActiveComponent(state),
  components: selectAllComponents(state),
  schema: selectSchema(state),
});

const mapDispatchToProps = dispatch => ({
  updateComponentProps: payload => dispatch(schemaAction.updateComponentProps(payload)),
  setActiveComponent: id => dispatch(sketchAction.setActiveComponent(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sider);
