import PropTypes from 'prop-types';
import BaseView from '../base/';
// import Flex from 'antd-mobile/lib/index.web';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
  }
  static propTypes = {
    ...BaseView.propTypes,
  }
  renderView() {
    return (
      <div>
        VC-Layout
        {this.props.children}
      </div>
    );
  }
}
