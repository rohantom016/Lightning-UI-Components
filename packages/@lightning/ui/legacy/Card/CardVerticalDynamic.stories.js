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
          backgroundColorFocus: args.backgroundColorFocus,
          gradientColor: args.gradientColor,
          focusRingColor: args.focusRingColor,
          src: pets,
          circleImage: args.circleImage,
          artWidth: 1920,
          artHeight: 1080,
          title: args.title,
          description: args.description,
          cta: args.cta,
          logo: args.showLogo ? circle : null,
          logoTitle: args.showLogo ? args.logoTitle : null,
          shouldAnimate: args.shouldAnimate
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
  cta: 'Watch on Netflix',
  showLogo: true,
  logoTitle: 'Logo Title',
  focused: false,
  shouldAnimate: true,
  circleImage: false
};
VerticalDynamic.argTypes = {
  gradientColor: { control: 'color' },
  focusRingColor: { control: 'color' },
  title: { content: 'text' },
  description: { content: 'text' },
  cta: { content: 'text' },
  showLogo: { content: 'boolean' },
  focused: { control: 'boolean' },
  circleImage: { control: 'boolean' },
  logoTitle: { control: 'text' },
  backgroundColorFocus: { control: 'color' }
};