import NestedSlider from './NestedSlider';
import ListItem from './ListItem';
import * as styles from './ListItemSlider.styles.js';
import TextBox from '../TextBox';

export default class ListItemSlider extends ListItem {
  static get __componentName() {
    return 'ListItemSlider';
  }

  static get __themeStyle() {
    return styles;
  }

  static _template() {
    const template = super._template;
    return {
      ...template(),
      Content: {
        ...template().Content,
        flex: { direction: 'column' },
        TextWrapper: {
          ...template().Content.TextWrapper,
          mountY: 0,
          flex: undefined
        },
        Slider: {
          type: NestedSlider,
          signals: {
            onChange: '_onSliderChanged'
          }
        }
      }
    };
  }

  static get properties() {
    return [...super.properties, 'slider', 'value'];
  }

  static get tags() {
    return [
      ...super.tags,
      { name: 'Slider', path: 'Content.Slider' },
      { name: 'Value', path: 'Content.TextWrapper.Value' }
    ];
  }

  _construct() {
    super._construct();
    this.value = 50;
  }

  _update() {
    super._update();
    this._updateSliderPosition();
    this._updateValue();
  }

  _onTextBoxChanged() {
    super._onTextBoxChanged();
    this._TextWrapper.h = Math.max(
      this._Title ? this._Title.h : 0,
      this._Value ? this._Value.h : 0
    );
  }

  _updateValue() {
    if (this._hasValue) {
      let valuePatch = {
        content: this.value.toString(),
        style: { textStyle: { ...this.style.valueTextStyle } },
        mountX: 1,
        x: this.w - this._paddingX
      };
      if (!this._Value) {
        valuePatch = {
          type: TextBox,
          signals: {
            textBoxChanged: '_onTextBoxChanged'
          },
          ...valuePatch
        };
      }
      this._TextWrapper.patch({ Value: valuePatch });
    } else {
      this._TextWrapper.patch({ Value: undefined });
    }
  }

  _updateSliderPosition() {
    const w = this.w - this._paddingLeft - this._paddingRight;
    let sliderProps = {
      mode: this.mode,
      tone: this.tone,
      w,
      x: w / 2,
      visible: !this._collapse,
      alpha: this.style.alpha,
      ...this.slider,
      value: this.value
    };

    if (this._isDisabledMode || this._isUnfocusedMode) {
      sliderProps = {
        ...sliderProps,
        mountX: 0.5
      };
    }

    this._Slider.patch(sliderProps);
  }

  get _hasValue() {
    return this.value != undefined || this.value != null;
  }

  get _fixedWordWrapWidth() {
    const titleWrapWidth =
      this.w - this._paddingLeft - this._paddingRight - this._paddingX;
    return titleWrapWidth;
  }

  _onSliderChanged(value, Slider) {
    if (value >= Slider.max) {
      this.value = Slider.max;
    } else if (value <= Slider.min) {
      this.value = Slider.min;
    } else {
      this.value = Slider.value;
    }
  }

  _handleLeft() {
    if (typeof this.onLeft === 'function') {
      return this.onLeft(this);
    } else if (this._Slider && !this._isDisabledMode) {
      return this._Slider._handleLeft();
    }
    return false;
  }

  _handleRight() {
    if (typeof this.onRight === 'function') {
      return this.onRight(this);
    } else if (this._Slider && !this._isDisabledMode) {
      return this._Slider._handleRight();
    }
    return false;
  }

  set announce(announce) {
    super.announce = announce;
  }

  get announce() {
    if (this._announce) {
      return this._announce;
    }

    return this.title + this.value + ', List Item Slider';
  }
}
