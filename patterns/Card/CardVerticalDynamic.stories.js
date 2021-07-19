import lng from '@lightningjs/core';
import { CardVerticalDynamic } from '.';
import circle from '../../assets/images/circle.svg';
import pets from '../../assets/images/The_Secret_Life_of_Pets_16x9.jpg';

export const VerticalDynamic = args =>
  class VerticalDynamic extends lng.Component {
    static _template() {
      return {
        Card: {
          type: CardVerticalDynamic,
          gradientColor: args.gradientColor,
          focusRingColor: args.focusRingColor,
          src: pets,
          artWidth: 1920,
          artHeight: 1080,
          title: args.title,
          description: args.description,
          action: args.action,
          logo: args.showLogo ? circle : null,
          logoWidth: 1920,
          logoHeight: 1080
        }
      };
    }

    _getFocused() {
      if (args.focused) {
        return this.tag('Card');
      }
    }
  };
VerticalDynamic.args = {
  gradientColor: '#E6004A',
  title: 'Title',
  description: 'Short Description',
  action: 'Watch on Netflix',
  showLogo: true
};
VerticalDynamic.argTypes = {
  gradientColor: { control: 'color' },
  focusRingColor: { control: 'color' },
  title: { content: 'text' },
  description: { content: 'text' },
  action: { content: 'text' },
  showLogo: { content: 'boolean' },
  focused: { control: 'boolean' }
};