import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const { Option } = Select;

const SelectSetter = ({
  options,
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
    style: {
      width: '100%',
    },
  };
  const optionList = options.map(o => <Option key={o.value} value={o.value}>{o.title || o.value}</Option>);
  return <Select {...props}>{optionList}</Select>;
};
SelectSetter.defaultProps = {
  options: [],
  value: '',
  onChange() {},
};
SelectSetter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  })),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectSetter;
