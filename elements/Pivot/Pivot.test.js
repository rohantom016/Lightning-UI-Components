import Pivot from '.';
import TestUtils from '../../test/lightning-test-utils';
import { getHexColor } from '../../Styles';

const icon = TestUtils.pathToDataURI('assets/images/ic_lightning_white_32.png');

const createPivot = TestUtils.makeCreateComponent(
  Pivot,
  {
    title: 'Pivot'
  },
  { focused: false }
);

describe('Pivot', () => {
  let pivot, testRenderer;
  beforeEach(() => {
    [pivot, testRenderer] = createPivot();
    testRenderer.update();
  });
  afterEach(() => {
    pivot = null;
    testRenderer = null;
  });

  it('should render', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should update it's shadow width for long titles", () => {
    [pivot, testRenderer] = createPivot({
      title:
        'This is a really long title title title title title title title title title title title title title title title title title title title title title title title'
    });

    expect(pivot.w).toBe(191);
    // lookup ID provides texture width: shadow{w}{h}{radius}{blur}{...margin}
    pivot._DropShadow.loadTexture();
    expect(pivot._DropShadow.texture._lookupId).toEqual(
      'shadow175,32,16,32,8,8,8,8'
    );
  });

  describe('style', () => {
    it('should set background to stroke', done => {
      [pivot, testRenderer] = createPivot({
        backgroundType: 'stroke'
      });

      setTimeout(() => {
        expect(pivot.color).toBe(0);
        expect(pivot.stroke).toBe(true);
        expect(pivot.strokeWeight).toBe(2);
        expect(pivot.strokeColor).toBe(0xffececf2);
        done();
      });
    });

    it('should set background to fill', done => {
      [pivot, testRenderer] = createPivot({
        backgroundType: 'fill'
      });
      setTimeout(() => {
        expect(pivot.color).toBe(getHexColor('232328'));
        done();
      });
    });
    it('should set background to float', done => {
      [pivot, testRenderer] = createPivot({
        backgroundType: 'float'
      });
      setTimeout(() => {
        expect(pivot.color).toBe(0);
        done();
      });
    });
    it('should default background to float', done => {
      [pivot, testRenderer] = createPivot({
        backgroundType: 'orange'
      });

      setTimeout(() => {
        expect(pivot.color).toBe(0);
        done();
      });
    });
  });

  describe('icon', () => {
    it('should patch in an icon', () => {
      [pivot, testRenderer] = createPivot({
        title: 'Action Button',
        icon
      });
      expect(pivot._icon).toEqual(
        expect.objectContaining({ src: icon, size: 32, spacing: 8 })
      );
    });
  });

  describe('loading', () => {
    it('should load if no title is set', () => {
      [pivot, testRenderer] = createPivot({
        title: undefined
      });

      testRenderer.update();
      expect(pivot._loading.isPlaying()).toBe(true);
    });
    it('should stop loading once title is set', done => {
      [pivot, testRenderer] = createPivot({
        title: undefined
      });

      testRenderer.update();
      expect(pivot._loading.isPlaying()).toBe(true);
      pivot.title = 'Action Button';
      setTimeout(() => {
        expect(pivot._loading.isPlaying()).toBe(false);
        done();
      }, 1);
    });
  });

  describe('focus', () => {
    it('should update color and scale on focus', done => {
      [pivot, testRenderer] = createPivot();
      pivot._smooth = false;
      pivot._focus();

      setTimeout(() => {
        expect(pivot.color).toBe(getHexColor('ECECF2'));
        expect(pivot.scale).toBe(1.26);
        expect(pivot._Title.color).toBe(getHexColor('000000', 95));
        done();
      });
    });

    it('should update color and scale on unfocus', () => {
      pivot._unfocus();
      testRenderer.update();
      expect(pivot.color).toBe(0);
      expect(pivot.scale).toBe(1);
      expect(pivot._Title.color).toBe(getHexColor('FFFFFF', 95));
    });

    it('should alpha in drop shadow and scale up on focus', done => {
      [pivot, testRenderer] = createPivot();
      pivot._smooth = false;
      pivot._focus();
      testRenderer.update();

      pivot._whenEnabled.then(() => {
        expect(pivot._DropShadow.alpha).toBe(1);
        expect(pivot.alpha).toBe(1);
        done();
      });
    });
    it('should alpha out drop shadow on unfocus', () => {
      pivot._unfocus();
      testRenderer.update();
      expect(pivot._DropShadow.alpha).toBe(0);
    });
  });
});