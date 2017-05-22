import PropTypes from 'prop-types';

const BoolSetter = ({ value, onChange }) => {
  const handleChange = () => {
    onChange(!value);
  };
  const props = {
    type: 'checkbox',
    onChange: handleChange,
    checked: value,
  };
  return <input {...props} />;
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
