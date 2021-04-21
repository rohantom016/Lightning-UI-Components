import lng from '@lightningjs/core';
import { rgba2argb } from '../../utils';
import withStyles from '../../mixins/withStyles';

import Tile from '.';
import Row from '../../layout/Row';
import mdx from './Tile.mdx';
import kabob from '../../assets/images/kabob_320x180.jpg';
import parks from '../../assets/images/Parks_and_Recreation_16x9.jpg';
import jurassic from '../../assets/images/Jurassic_World_16x9.jpg';
import trolls from '../../assets/images/Trolls_World_Tour_16x9.jpg';
import pets from '../../assets/images/The_Secret_Life_of_Pets_16x9.jpg';

export default {
  title: 'Elements / Tile',
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = args =>
  class Basic extends lng.Component {
    static _template() {
      return {
        Tile: {
          type: withStyles(Tile, { unfocused: { shadow: { alpha: 1 } } }),
          src: kabob,
          w: 320,
          h: 180,
          blur: args.blur,
          radius: args.radius,
          imgRadius: args.imgRadius,
          shadow: {
            w: 320,
            h: 180,
            x: 10,
            y: 10,
            zIndex: -1,
            texture: lng.Tools.getShadowRect(320, 180, args.radius, args.blur),
            color: rgba2argb(args.color)
          }
        }
      };
    }

    _getFocused() {
      if (args.focused) {
        return this.tag('Tile');
      }
    }
  };
Basic.args = {
  blur: 0,
  radius: 16,
  imgRadius: 16,
  color: 'rgba(63,92,30,0.7)'
};
Basic.argTypes = {
  focused: { control: 'boolean' },
  blur: {
    control: {
      type: 'range',
      min: 0,
      max: 4,
      step: 0.5
    }
  },
  radius: {
    control: {
      type: 'range',
      min: 0,
      max: 100,
      step: 5
    }
  },
  imgRadius: {
    control: {
      type: 'range',
      min: 0,
      max: 100,
      step: 5
    }
  },
  color: { control: 'color' }
};
Basic.parameters = {
  argActions: {
    focused: (isFocused, component) => {
      component._getFocused = isFocused
        ? () => component.tag('Tile')
        : () => {};
      component._refocus();
    }
  }
};

export const XfinityTheme = args =>
  class Basic extends lng.Component {
    static _template() {
      return {
        x: 60,
        y: 60,
        Row: {
          type: Row,
          itemSpacing: 60,
          items: [
            {
              type: Tile,
              src: parks,
              w: args.width,
              h: args.height,
              radius: args.radius,
              onEnter: (keyEvent, tile) => {
                console.log('You hit Enter ', keyEvent);
              }
            },
            {
              type: Tile,
              src: jurassic,
              w: args.width,
              h: args.height,
              radius: args.radius,
              onArrowDown: (keyEvent, tile) => {
                console.log('You hit Down ', keyEvent);
              }
            },
            {
              type: Tile,
              src: trolls,
              w: args.width,
              h: args.height,
              radius: args.radius,
              onArrowUp: (keyEvent, tile) => {
                console.log('You hit Up ', keyEvent);
              }
            },
            {
              type: Tile,
              src: pets,
              w: args.width,
              h: args.height,
              radius: args.radius
            },
            {
              type: Tile,
              w: args.width,
              h: args.height,
              radius: args.radius
            }
          ]
        }
      };
    }

    $onEnter(keyEvent, tile) {
      console.log('Enter on Tile ', tile);
    }

    _getFocused() {
      return this.tag('Row');
    }
  };

XfinityTheme.args = {
  width: 320,
  height: 180,
  radius: 8
};