import { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

import { SCREEN_RESOULTION_DEFINE } from '../../constants';
import styles from './DeviceChanger.css';

const { Option } = Select;


export default class DeviceChange extends Component {
  static defaultProps = {
    value: undefined,
    onChange() {},
  }
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }
  handleChange = (value) => {
    this.props.onChange(value);
  }
  render() {
    const { value } = this.props;
    return (
      <Select onChange={this.handleChange} value={value}>
        {
          Object.keys(SCREEN_RESOULTION_DEFINE).map(
            d => <Option value={d} key={d}>{d}</Option>,
          )
        }
      </Select>
    );
  }
}
