import lng from 'wpe-lightning';
import { clone } from '../../utils';
import { CORNER_RADIUS, getFocusScale } from './Styles';
import { PALETTE } from '../Styles/Colors';
import { TYPOGRAPHY } from '../Styles/Fonts';

function shadow({
  w,
  h,
  color = 0xffffffff,
  borderRadius = CORNER_RADIUS.small,
  blur = spacing(2)
}) {
  const shadow = {
    borderRadius,
    blur,
    color,
    mount: 0.5,
    w: w - spacing(2),
    h: h / 2,
    x: w / 2 + spacing(0.25),
    y: h / 1.3,
    zIndex: -1
  };

  return {
    color: shadow.color,
    mount: shadow.mount,
    x: shadow.x,
    y: shadow.y,
    zIndex: shadow.zIndex,
    texture: lng.Tools.getShadowRect(
      shadow.w,
      shadow.h,
      shadow.borderRadius,
      shadow.blur
    )
  };
}

function spacing(multiplier) {
  return 8 * multiplier;
}

export const getXfinityTheme = () => ({
  getFocusScale,
  spacing,
  shadow,
  palette: PALETTE,
  typography: TYPOGRAPHY,
  border: {
    focused: {
      width: 2
    },
    radius: CORNER_RADIUS
  }
});

/**
 * Combines two theme objects to create a new theme
 * @param {Object|function} theme - An object or callback that accepts the default theme as an argument. Gets merged with the default theme
 * @param {Object} [defaultTheme] - Theme to be merged with. Defaults to the Xfinity theme
 */
export default (theme, defaultTheme = getXfinityTheme()) => {
  if (typeof theme === 'function') {
    return clone(defaultTheme, theme(defaultTheme));
  }

  return clone(defaultTheme, theme);
};