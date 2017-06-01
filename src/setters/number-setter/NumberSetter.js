import PropTypes from 'prop-types';
import InputNumber from 'antd/lib/input-number';

const NumberSetter = ({
  value,
  onChange,
  ...otherProps
}) => {
  const handleChange = (v) => {
    onChange(v);
  };
  const props = {
    onChange: handleChange,
    value,
    ...otherProps,
  };
  return <InputNumber {...props} />;
};
NumberSetter.defaultProps = {
  min: -Infinity,
  max: Infinity,
  step: 1,
  placeholder: '',
  value: '',
  onChange() {},
};
NumberSetter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default NumberSetter;
