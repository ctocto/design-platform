import { Component } from 'react';
import PropTypes from 'prop-types';

import { SCREEN_RESOULTION_DEFINE } from '../../constants';
import styles from './DeviceChanger.css';


export default class DeviceChange extends Component {
  static defaultProps = {
    value: undefined,
    onChange() {},
  }
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }
  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }
  render() {
    const { value } = this.props;
    return (
      <select onChange={this.handleChange} value={value}>
        {
          Object.keys(SCREEN_RESOULTION_DEFINE).map(
            d => <option key={d}>{d}</option>,
          )
        }
      </select>
    );
  }
}
