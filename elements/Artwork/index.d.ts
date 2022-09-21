import type Base from '../../Base';
import type lng from '@lightningjs/core';
type aspectRatio = '16x9' | '3x4' | '4x3' | '2x1' | '1x1';

type transitionObject = {
  delay: number;
  duration: number;
  timingFunction: string;
};

export interface ArtworkStyles {
  animationBlurEntrance?: transitionObject;
  animationBlurExit?: transitionObject;
  animationComponentEntrance?: transitionObject;
  animationGradientEntrance?: transitionObject;
  animationGradientExit?: transitionObject;
  animationImageScaleEntrance?: transitionObject;
  animationImageScaleExit?: transitionObject;
  blur?: number;
  centerImageRadius?: number;
  fallbackSrc?: undefined;
  fillColor?: number;
  gradientColor?: number;
  imageScale?: number;
  imageScalePivotX?: number;
  imageScalePivotY?: number;
  padding?: number;
  radius?: lng.Tools.CornerRadius;
  zIndex?: {
    image?: number;
    blur?: number;
    centerImage?: number;
    fill?: number;
    gradient?: number;
    foreground?: number;
  };
}

export default class Artwork extends Base {
  blur?: boolean;
  fallbackSrc?: string;
  foregroundH?: number;
  foregroundSrc?: string;
  foregroundW?: number;
  gradient?: boolean;
  shouldScale?: boolean;
  mode?: 'default' | 'circle' | 'square' | 'contain';
  src: string; // Inherited from lng.Element
  srcCallback?: (obj: {
    closestAspectRatio: string;
    aspectRatio: string;
    src: string;
    w: number;
    h: number;
  }) => string;
  srcCallbackAspectRatios?: aspectRatio[];
  style: ArtworkStyles;
}
