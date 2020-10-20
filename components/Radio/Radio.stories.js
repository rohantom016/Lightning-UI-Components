import lng from 'wpe-lightning';

import Radio from '.';
import mdx from './Radio.mdx';

export default {
  title: 'Radio',
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
        Radio: {
          type: Radio
        }
      };
    }

    _getFocused() {
      return this.tag('Radio');
    }
  };
Basic.args = { checked: false };
Basic.argTypes = {
  checked: { control: 'boolean' }
};
Basic.parameters = {
  argActions: {
    checked: (_, component) => {
      component.tag('Radio').toggle();
    }
  }
};