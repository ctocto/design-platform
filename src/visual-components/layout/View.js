import PropTypes from 'prop-types';
import BaseView from '../base/';

export default class View extends BaseView {
  static defaultProps = {
    ...BaseView.defaultProps,
    content: '',
  }
  static propTypes = {
    ...BaseView.propTypes,
    content: PropTypes.string,
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
