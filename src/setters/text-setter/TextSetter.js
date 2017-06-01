import PropTypes from 'prop-types';
import assign from 'lodash/assign';
import Input from 'antd/lib/input';

const TextSetter = ({ placeholder, multipleLine, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  const props = {
    onChange: handleChange,
    placeholder,
    value,
  };
  if (!multipleLine) {
    assign(props, {
      type: 'text',
    });
  } else {
    assign(props, {
      type: 'textarea',
      autosize: true,
    });
  }
  return <Input {...props} />;
};
TextSetter.defaultProps = {
  placeholder: '',
  value: '',
  multipleLine: false,
  onChange() {},
};
TextSetter.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  multipleLine: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TextSetter;
