import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ComponentPane from '../components/component-pane/';

class LeftPane extends PureComponent {
  static defaultProps = {
    className: '',
  }
  static propTypes = {
    className: PropTypes.string,
  }
  render() {
    const { className } = this.props;
    const props = {
      className,
    };
    return (
      <div {...props}>
        <ComponentPane />
      </div>
    );
  }
}

export default LeftPane;
