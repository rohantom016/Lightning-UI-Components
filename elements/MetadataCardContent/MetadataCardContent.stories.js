import lng from '@lightningjs/core';
import MetadataCardContent from '.';
import mdx from './MetadataCardContent.mdx';
import xfinityProviderLogoSquare from '../../assets/images/Xfinity-Provider-Logo-Square.png';

export default {
  title: 'Elements / MetadataCardContent',
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
        MetadataCardContent: {
          w: args.w,
          h: args.h,
          type: MetadataCardContent,
          title: args.title,
          description: args.description,
          details: args.details,
          provider: {
            visibleCount: args.visibleCount,
            providers: Array.apply(null, { length: 10 }).map(
              () => xfinityProviderLogoSquare
            )
          }
        }
      };
    }

    _getFocused() {
      return this.tag('MetadataCardContent');
    }
  };
Basic.argTypes = {
  w: {
    defaultValue: 600,
    table: {
      defaultValue: { summary: 600 }
    },
    control: 'number',
    description: 'width of component'
  },
  h: {
    defaultValue: 250,
    table: {
      defaultValue: { summary: 250 }
    },
    control: 'number',
    description: 'height of component'
  },
  title: {
    defaultValue: 'Title',
    table: {
      defaultValue: { summary: 'Title' }
    },
    control: 'text',
    description: 'title text'
  },
  description: {
    defaultValue: 'Description',
    table: {
      defaultValue: { summary: 'Description' }
    },
    control: 'text',
    description: 'description text'
  },
  details: {
    defaultValue: 'Details',
    table: {
      defaultValue: { summary: 'Details' }
    },
    control: 'text',
    description: 'details text'
  },
  visibleCount: {
    control: { type: 'range', min: 1, max: 10, step: 1 },
    defaultValue: 3,
    description: 'number of visible providers',
    table: {
      defaultValue: { summary: 3 }
    }
  }
};