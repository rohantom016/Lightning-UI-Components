import { base as ControlStyle } from './Control.styles.js';

export const base = theme => {
  const parentStyle = ControlStyle(theme);
  const h = theme.spacer.md * 7;
  const radiusOffset = (parentStyle.h - h) / 2;
  const radius = Math.max(parentStyle.radius - radiusOffset, 0);
  const logoRadius = Math.max(radius - parentStyle.paddingX / 2, 0);

  return {
    h,
    logoStyle: {
      radius: logoRadius,
      h: theme.spacer.md * 5,
      w: theme.spacer.md * 6
    },
    prefixH: theme.spacer.md * 5,
    radius,
    textStyle: theme.typography.button2,
    minWidth: theme.spacer.md * 8
  };
};