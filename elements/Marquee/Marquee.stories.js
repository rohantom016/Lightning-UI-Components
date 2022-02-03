import lng from '@lightningjs/core';

import Marquee from '.';
import InlineContent from '../../layout/InlineContent';
import mdx from './Marquee.mdx';
import { PALETTE, TYPOGRAPHY } from '../../Styles';

export default {
  title: 'Elements / Marquee',
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
        Marquee: {
          type: Marquee,
          w: 350,
          h: 180,
          title: {
            text: args.title,
            ...TYPOGRAPHY.headline2,
            textColor: PALETTE.text.light.primary,
            lineHeight: 44,
            maxLines: 1
          },
          autoStart: args.autoStart,
          delay: args.delay,
          color: args.color,
          repeat: args.repeat
        }
      };
    }
    _getFocused() {
      return this.tag('Marquee');
    }
  };
Basic.args = {
  title: 'This is a scrolling Marquee component for long text',
  autoStart: true,
  centerAlign: false,
  repeat: -1,
  delay: 1.5
};
Basic.argTypes = {
  title: {
    control: 'text',
    description: 'An object matching Lightning text object'
  },
  autoStart: {
    control: { type: 'boolean' },
    description: 'Start scrolling on initiation'
  },
  color: {
    name: 'color',
    control: { type: 'color' },
    description: 'Set color of text'
  },
  repeat: {
    control: { type: 'number', min: -1 },
    description: 'Number of times to repeat scrolling'
  },
  delay: {
    control: { type: 'number', min: 1.5 },
    description: 'Delay before scrolling starts'
  },
  centerAlign: {
    control: { type: 'boolean' },
    description:
      'Will center the entire texture if the width of the content is less than the container'
  }
};

export const CenteredText = args =>
  class CenteredText extends lng.Component {
    static _template() {
      return {
        Marquee: {
          type: Marquee,
          w: args.width,
          h: 50,
          title: {
            text: 'No scroll center',
            ...TYPOGRAPHY.headline2,
            textColor: PALETTE.text.light.primary,
            maxLines: 1,
            textAlign: 'center'
          },
          autoStart: true,
          delay: 1,
          shouldSmooth: args.shouldSmooth
        },
        InlineContent: {
          type: InlineContent,
          x: 200,
          alpha: 0.001,
          justify: 'flex-start',
          content: [
            'Centered',
            {
              icon: 'http://myriad.merlin.comcast.com/select/logo?entityId=8527084350383982239&width=32&height=&ratio=1x1&trim=false',
              title: 'Rotten Tomatoes rating'
            },
            ' InlineContent'
          ],
          rtt: true
        },
        MarqueeInlineContent: {
          type: Marquee,
          y: 100,
          w: args.width,
          h: 180,
          centerAlign: true,
          alpha: 0,
          autoStart: true,
          delay: 1,
          shouldSmooth: args.shouldSmooth
        }
      };
    }

    _init() {
      this.tag('MarqueeInlineContent').contentTexture =
        this.tag('InlineContent').getTexture();
      this.tag('MarqueeInlineContent').alpha = 1;
    }
  };

CenteredText.args = { shouldSmooth: true, width: 450 };
CenteredText.argTypes = {
  width: { control: 'number', min: 0 },
  shouldSmooth: { control: 'boolean' }
};
CenteredText.parameters = {
  argActions: {}
};