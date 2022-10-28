import { getWidthByUpCount } from '../../utils';

export const base = theme => ({
  cursorStyles: {
    textColor: theme.color.textNeutral,
    blink: true,
    w: theme.spacer.xs,
    h: theme.spacer.xxl
  },
  eyebrowTextStyle: {
    ...theme.typography.caption1,
    maxLines: 1,
    textColor: theme.color.textNeutral
  },
  helpTextStyle: {
    ...theme.typography.caption1,
    maxLines: 1,
    textColor: theme.color.textNeutralSecondary
  },
  minWidth: getWidthByUpCount(4),
  paddingX: theme.spacer.xl,
  paddingY: theme.spacer.xl
});

export const mode = theme => ({
  disabled: {
    eyebrowTextStyle: { textColor: theme.color.textNeutralDisabled },
    helpTextStyle: { textColor: theme.color.textNeutralDisabled }
  },
  focused: {
    cursorStyles: { textColor: theme.color.textInverse },
    eyebrowTextStyle: { textColor: theme.color.textNeutral },
    helpTextStyle: { textColor: theme.color.textNeutral }
  }
});

export const palette = theme => ({
  inverse: {
    mode: {
      focused: {
        eyebrowTextStyle: { textColor: theme.color.textInverseDisabled },
        helpTextStyle: { textColor: theme.color.textInverseDisabled }
      }
    }
  }
});
