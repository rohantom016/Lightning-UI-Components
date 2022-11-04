import { Base } from '@lightning/ui';
import type { Color, StylePartial } from '@lightning/ui-core';

export type DistractorStyles = {
  alpha1: number;
  alpha2: number;
  alpha3: number;
  circleColor: Color;
  circleSize: number;
  scale1: number;
  scale2: number;
  scale3: number;
  smoothness: number;
};

export default class Distractor extends Base {
  get style(): DistractorStyles;
  set style(v: StylePartial<DistractorStyles>);
}