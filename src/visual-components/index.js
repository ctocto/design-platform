import LayoutView, { prototype as layoutPrototype } from './layout/';
import TextView, { prototype as textPrototype } from './text/';

export const VcLayout = {
  View: LayoutView,
  prototype: layoutPrototype,
};

export const VcText = {
  View: TextView,
  prototype: textPrototype,
};
