import PropTypes from 'prop-types';
import Switch from 'antd/lib/switch';

const BoolSetter = ({ value, onChange }) => {
  const handleChange = (checked) => {
    onChange(checked);
  };
  const props = {
    onChange: handleChange,
    checked: value,
  };
  return <Switch {...props} />;
};
BoolSetter.defaultProps = {
  value: false,
  onChange() {},
};
BoolSetter.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default BoolSetter;
