import LayoutView, {
  prototype as layoutPrototype,
  PrototypeView as LayoutPrototypeView,
} from './layout/';
import TextView, {
  prototype as textPrototype,
  PrototypeView as TextPrototypeView,
} from './text/';

export const VcLayout = {
  View: LayoutView,
  PrototypeView: LayoutPrototypeView,
  prototype: layoutPrototype,
};

export const VcText = {
  View: TextView,
  PrototypeView: TextPrototypeView,
  prototype: textPrototype,
};
