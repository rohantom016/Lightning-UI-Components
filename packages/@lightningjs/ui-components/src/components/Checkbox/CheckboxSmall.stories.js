import lng from '@lightningjs/core';
import { default as CheckboxSmallComponent } from './CheckboxSmall.js';
import mdx from './Checkbox.mdx';
import { createModeControl } from 'lightning-ui-docs/.storybook/utils';
import { CATEGORIES } from 'lightning-ui-docs';

export default {
  title: `${CATEGORIES[512]}/CheckboxSmall`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const CheckboxSmall = () => {
  return class CheckboxSmall extends lng.Component {
    static _template() {
      return {
        Checkbox: {
          type: CheckboxSmallComponent
        }
      };
    }
  };
};
CheckboxSmall.storyName = 'CheckboxSmall';
CheckboxSmall.args = {
  checked: false,
  mode: 'focused'
};
CheckboxSmall.argTypes = {
  ...createModeControl({ summaryValue: 'focused' }),
  checked: {
    control: 'boolean',
    description: 'Toggles checked between on and off',
    table: {
      defaultValue: { summary: false }
    }
  }
};