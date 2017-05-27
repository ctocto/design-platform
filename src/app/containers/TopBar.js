import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deviceAction } from '../actions/';
import DeviceChanger from '../components/device-changer';

class TopBar extends PureComponent {
  static defaultProps = {
    className: '',
    deviceName: undefined,
    changeDevice() {},
  }
  static propTypes = {
    className: PropTypes.string,
    deviceName: PropTypes.string,
    changeDevice: PropTypes.func,
  }
  render() {
    const { className, deviceName, changeDevice } = this.props;
    const props = {
      className,
    };
    return (
      <div {...props}>
        <DeviceChanger
          value={deviceName}
          onChange={changeDevice}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deviceName: state.device.name,
});

const mapDispatchToProps = dispatch => ({
  changeDevice(name) {
    dispatch(deviceAction.setDevice(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
