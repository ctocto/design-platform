import LayoutView, {
  prototype as layoutPrototype,
  PrototypeView as LayoutPrototypeView,
} from './layout/';
import TextView, {
  prototype as textPrototype,
  PrototypeView as TextPrototypeView,
} from './text/';
import ImageView, {
  prototype as imagePrototype,
  PrototypeView as ImagePrototypeView,
} from './image/';

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

export const VcImage = {
  View: ImageView,
  PrototypeView: ImagePrototypeView,
  prototype: imagePrototype,
};
