import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RightPane extends PureComponent {
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
    return <div {...props}>RightPane</div>;
  }
}

export default RightPane;
