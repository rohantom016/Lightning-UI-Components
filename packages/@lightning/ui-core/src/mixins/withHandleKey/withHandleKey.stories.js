import lng from '@lightningjs/core';
import { Tile, Row } from '../../components/index.js';
import { context } from '../../globals/index.js';
import kabob from '../../assets/images/kabob_320x180.jpg';
import mdx from './withHandleKey.mdx';
import withHandleKey from './index.js';

context.config({
  // Inspect console to see - should only be called when pressing enter on first tile.
  keyMetricsCallback: (key, p) => {
    // eslint-disable-next-line
    console.log('Metrics payload received', key, p);
  }
});

import { CATEGORIES } from 'lightning-ui-docs';

export default {
  title: `${CATEGORIES[512]}/withHandleKey`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Base = args => {
  class BaseInternal extends lng.Component {
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
              src: kabob,
              w: 320,
              h: 180,
              onEnter: args.onEnter,
              metricsPayload: args.metricsPayload('enter', 1)
            },
            {
              type: Tile,
              src: kabob,
              w: 320,
              h: 180,
              onArrowDown: args.onArrowDown,
              metricsPayload: args.metricsPayload('arrow down', 2)
            },
            {
              type: Tile,
              src: kabob,
              w: 320,
              h: 180,
              onArrowUp: args.onArrowUp,
              metricsPayload: args.metricsPayload('arrow up', 3)
            },
            {
              type: Tile,
              src: kabob,
              w: 320,
              h: 180,
              onArrowRight: args.onArrowRight,
              metricsPayload: args.metricsPayload('arrow right', 4)
            }
          ]
        }
      };
    }

    // eslint-disable-next-line no-unused-vars
    $onEnter(keyEvent, tile) {
      args.onEnter();
    }

    _getFocused() {
      return this.tag('Row');
    }
  }
  return withHandleKey(BaseInternal);
};

Base.args = {
  metricsPayload: (name, id) => ({
    buttonName: `${name} button`,
    uniqueId: id
  })
};

Base.argTypes = {
  onEnter: { action: 'You hit Enter' }
};