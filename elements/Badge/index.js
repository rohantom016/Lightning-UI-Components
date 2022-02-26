import lng from '@lightningjs/core';
import Base from '../../Base';
import Icon from '../Icon';
import styles from './Badge.styles';
import TextBox from '../TextBox';
import { withExtensions } from '../../mixins';
import withStyles from '../../mixins/withThemeStyles';
import { getHexColor } from '../../Styles';

class Badge extends Base {
  static _template() {
    return {
      rect: true,
      shader: {
        type: lng.shaders.RoundedRectangle
      },
      BadgeText: {
        type: TextBox,
        mountY: 0.5,
        signals: {
          textBoxChanged: '_badgeTextLoaded'
        }
      },
      Icon: {
        type: Icon
      }
    };
  }

  static get __componentName() {
    return 'Badge';
  }

  static get properties() {
    return [
      'icon',
      'title',
      'iconWidth',
      'iconColor',
      'iconHeight',
      'iconAlign'
    ];
  }

  static get tags() {
    return ['BadgeText', 'Icon'];
  }

  _update() {
    this._updateText();
    this._updateIcon();
    this._updatePositions();
    this._updateBackground();
  }

  _init() {
    this._Icon.on('txLoaded', this._updatePositions.bind(this));
    this._BadgeText.on('txLoaded', this._updatePositions.bind(this));
    super._init();
  }

  _updateBackground() {
    this._updateWidth();
    let heightDifference = 0;
    if (this.iconHeight > this._BadgeText.renderHeight) {
      heightDifference = this.iconHeight - this._BadgeText.renderHeight;
    }

    this.patch({
      h: this.title
        ? this._BadgeText.renderHeight +
          this._componentStyles.paddingY * 2 +
          heightDifference
        : this._componentStyles.paddingY * 2 + this.iconHeight,
      color: this._componentStyles.backgroundColor,
      shader: { radius: this._componentStyles.radius }
    });
  }

  _updateText() {
    this._updateWidth();
    this._BadgeText.patch({
      textColor: this._componentStyles.textColor,
      textAlign: this._componentStyles.textAlign,
      textStyle: this._componentStyles.textStyle,
      content: this.title || '',
      x: this._componentStyles.paddingX,
      y: this._h / 2
    });
  }

  _updateIcon() {
    this._Icon.patch({
      icon: this.icon,
      w: this.iconWidth,
      h: this.iconHeight,
      style: {
        color: getHexColor(this._componentStyles.textColor)
      }
    });
  }
  _updateWidth() {
    let contentSpacing = 0;
    if (this.icon && this.title) {
      contentSpacing = this._componentStyles.contentSpacing;
    }
    this.w = this.title
      ? this._BadgeText.renderWidth +
        this._componentStyles.paddingX * 2 +
        (this._Icon.finalW || 0) +
        contentSpacing
      : this._componentStyles.paddingX * 2 + (this._Icon.finalW || 0);
  }

  _updatePositions() {
    this._Icon.h = this.iconHeight;
    this._Icon.w = this.iconWidth || this._Icon.finalW;
    this._Icon.y = (this.h - this._Icon.h) / 2;
    // set icon and text position
    if (this.iconAlign === 'left' && this.title) {
      this._Icon.x = this._componentStyles.paddingX;
      this._BadgeText.x =
        this._Icon.x + this._Icon.w + this._componentStyles.contentSpacing;
    } else if (this.iconAlign === 'right' && this.title) {
      this._BadgeText.x = this._componentStyles.paddingX;
      this._Icon.x =
        this._BadgeText.x +
        this._BadgeText.renderWidth +
        this._componentStyles.contentSpacing;
    } else {
      this._Icon.x = this._componentStyles.paddingX;
    }

    this._updateWidth();

    this._BadgeText.y = this._h / 2; // Set new alignment for badge text

    this.fireAncestors('$loadedBadge', this);
  }

  _getIconHeight() {
    if (this.icon) {
      if (!this._Icon.finalH) {
        return this._BadgeText.text.lineHeight;
      } else {
        return this._Icon.finalH;
      }
    } else {
      return 0;
    }
  }
}

export default withExtensions(withStyles(Badge, styles));
