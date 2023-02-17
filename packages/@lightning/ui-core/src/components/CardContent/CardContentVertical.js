import * as styles from './CardContentVertical.styles';
import CardContent from './CardContent';

export default class CardContentVertical extends CardContent {
  static get __componentName() {
    return 'CardContentVertical';
  }

  static get __themeStyle() {
    return styles;
  }

  _init() {
    this._orientation = 'vertical';
    super._init();
  }
}
