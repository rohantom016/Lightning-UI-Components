import { getWidthByUpCount } from '../../utils';

export const base = theme => ({
  paddingHorizontal: theme.spacer.xl,
  paddingVertical: theme.spacer.xl,
  radius: theme.radius.md,
  titleTextProperties: {
    ...theme.typography.headline1,
    wordWrapTrue: true,
    maxLines: 2,
    textColor: theme.color.coreNeutral
  },
  textColor: theme.color.coreNeutral,
  w: getWidthByUpCount(6)
});

export const mode = theme => ({
  disabled: {
    backgroundColor: theme.color.coreInverseDisabled,
    titleTextProperties: {
      textColor: theme.color.coreNeutralDisabled
    },
    textColor: theme.color.coreNeutralDisabled
  }
});

export const palette = theme => ({
  neutral: {
    mode: {
      focused: {
        backgroundColor: theme.color.interactiveNeutralFocusSoft
      }
    }
  },
  inverse: {
    mode: {
      focused: {
        backgroundColor: theme.color.interactiveInverseFocusSoft
      }
    }
  },
  brand: {
    mode: {
      focused: {
        backgroundColor: theme.color.interactiveBrandFocusSoft
      }
    }
  }
});
