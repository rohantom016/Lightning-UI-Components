import lng from '@lightningjs/core';
import Slider from './SliderLarge.js';
import mdx from './Slider.mdx';
import { createModeControl } from 'lightning-ui-docs/.storybook/utils';
import TextBox from '../TextBox/index.js';
import { CATEGORIES } from 'lightning-ui-docs';

export default {
  title: `${CATEGORIES[512]}/SliderLarge`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = () =>
  class Basic extends lng.Component {
    static _template() {
      return {
        Slider: {
          type: Slider
        }
      };
    }
  };

Basic.args = {
  min: 0,
  max: 100,
  value: 50,
  step: 1,
  mode: 'focused'
};

Basic.argTypes = {
  ...createModeControl({ summaryValue: 'focused' }),
  min: {
    control: 'number',
    description: 'Lower bound of value',
    table: { defaultValue: { summary: 0 } }
  },
  max: {
    control: 'number',
    description: 'Upper bound of value',
    table: { defaultValue: { summary: 100 } }
  },
  value: {
    control: 'number',
    description: 'Current value',
    table: { defaultValue: { summary: '0 or min' } }
  },
  step: {
    control: 'number',
    description: '+/- value on change',
    table: { defaultValue: { summary: 1 } }
  }
};

export const SignalHandlingLarge = () =>
  class SignalHandling extends lng.Component {
    static _template() {
      return {
        flex: { direction: 'column' },
        Slider: {
          type: Slider,
          y: 20,
          step: 10,
          value: 30,
          w: 328,
          signals: {
            onChange: true
          }
        },
        Text: {
          y: 60,
          type: TextBox
        }
      };
    }

    onChange(value) {
      this.tag('Text').content = `Value: ${value}`;
    }
  };

SignalHandlingLarge.args = {
  mode: 'focused'
};

SignalHandlingLarge.argTypes = createModeControl({ summaryValue: 'focused' });