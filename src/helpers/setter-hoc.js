import { PureComponent, cloneElement } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const getDisplayName = c => c.displayName || c.name || 'Component';

export default function setterProvider(SetterComponent, item) {
  const onChange = (value) => {
    this.value = value;
  };
  class SetterWapper extends PureComponent {
    static displayName = `Setter(${getDisplayName(SetterComponent)})`;
    render() {
      const { fields } = this.props;
      const props = {
        value: fields[item.name],
        onChange,
        key: item.name,
        fields,
      };
      if (typeof SetterComponent === 'function') {
        return cloneElement(SetterComponent(props), props);
      }
      return cloneElement(SetterComponent, props);
    }
  }
  return hoistNonReactStatic(SetterWapper, SetterComponent);
}
