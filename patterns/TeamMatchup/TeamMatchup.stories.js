import lng from '@lightningjs/core';
import TeamMatchup from '.';
import mdx from './TeamMatchup.mdx';
import PHI from '../../assets/images/PHI.png';
import NYG from '../../assets/images/NYG.png';
import { getValidColor } from '../../Styles';

export default {
  title: 'Patterns / TeamMatchup',
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = args => {
  return class Basic extends lng.Component {
    static _template() {
      return {
        Matchup: {
          type: TeamMatchup,
          subtitle: args.subtitle,
          title: args.title,
          removeBackground: args.removeBackground,
          metadata: args.metadata,
          items: {
            left: {
              name: 'Eagles',
              color: getValidColor(args.colorLeft),
              src: PHI
            },
            right: {
              name: 'Giants',
              color: getValidColor(args.colorRight),
              src: NYG
            }
          }
        }
      };
    }

    _getFocused() {
      if (args.focused) {
        return this.tag('Matchup');
      }
    }
  };
};

Basic.args = {
  title: '24 - 13',
  subtitle: '1st - 1:15',
  focused: false,
  colorLeft: 'rgba(8,111,107,1)',
  colorRight: 'rgba(11,81,161,1)',
  removeBackground: false,
  metadata: 'Eagles vs Giants'
};
Basic.argTypes = {
  focused: { control: 'boolean' },
  colorLeft: { control: 'color' },
  colorRight: { control: 'color' },
  removeBackground: { control: 'boolean' }
};
Basic.parameters = {
  argActions: {
    focused: (isFocused, component) => {
      component._getFocused = isFocused
        ? () => component.tag('Matchup')
        : () => {};
      component._refocus();
    },
    title: (title, component) => {
      component.tag('Matchup').title = title;
    },
    colorLeft: (colorLeft, component) => {
      component.tag('Matchup').colorLeft = colorLeft;
    },
    colorRight: (colorRight, component) => {
      component.tag('Matchup').colorRight = colorRight;
    },
    subtitle: (subtitle, component) => {
      component.tag('Matchup').subtitle = subtitle;
    },
    removeBackground: (isFloatBg, component) => {
      component.tag('Matchup').removeBackground = isFloatBg;
    },
    metadata: (metadata, component) => {
      component.tag('Matchup').metadata = metadata;
    }
  }
};