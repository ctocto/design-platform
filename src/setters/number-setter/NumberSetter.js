import PropTypes from 'prop-types';

const NumberSetter = ({ placeholder, value, onChange }) => {
  const handleChange = (e) => {
    let v = parseFloat(e.target.value, 10);
    if (isNaN(v)) {
      v = 1;
    }
    onChange(v);
  };
  const props = {
    onChange: handleChange,
    placeholder,
    value,
    type: 'number',
  };
  return <input {...props} />;
};
NumberSetter.defaultProps = {
  placeholder: '',
  value: '',
  onChange() {},
};
NumberSetter.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default NumberSetter;
