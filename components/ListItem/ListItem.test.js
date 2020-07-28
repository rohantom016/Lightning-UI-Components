import ListItem, { ListItemBase, ListItemToggle } from '.';
import { getHexColor } from '../Styles';
import TestUtils from '../lightning-test-utils';

const icon = TestUtils.pathToDataURI('assets/images/ic_lightning_white_32.png');

const createListItem = TestUtils.makeCreateComponent(ListItem);
const createListItemBase = TestUtils.makeCreateComponent(ListItemBase);
const createListItemToggle = TestUtils.makeCreateComponent(ListItemToggle);

describe('ListItemBase', () => {
  let listItemBase, testRenderer;
  beforeEach(() => {
    [listItemBase, testRenderer] = createListItemBase();
    testRenderer.update();
  });
  afterEach(() => {
    listItemBase = null;
    testRenderer = null;
  });

  it('should render', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct height', () => {
    expect(listItemBase._Container.finalH).toBe(88);
  });

  it('renders small size', () => {
    [listItemBase, testRenderer] = createListItemBase({ size: 'small' });
    testRenderer.update();
    expect(listItemBase._Container.finalW).toBe(410);
  });

  it('renders large size', () => {
    [listItemBase, testRenderer] = createListItemBase({ size: 'large' });
    testRenderer.update();
    expect(listItemBase._Container.finalW).toBe(860);
  });

  it('renders custom size', () => {
    [listItemBase, testRenderer] = createListItemBase({ w: 500 });
    testRenderer.update();
    expect(listItemBase._Container.finalW).toBe(500);
  });

  describe('focus', () => {
    it('has a default unfocus background', () => {
      expect(listItemBase._Container.color).toBe(getHexColor('141417'));
    });
    it('supports background props', () => {
      [listItemBase, testRenderer] = createListItemBase({ background: 'fill' });
      testRenderer.update();
      expect(listItemBase._Container.color).toBe(getHexColor('141417'));

      [listItemBase, testRenderer] = createListItemBase({
        background: 'float'
      });
      testRenderer.update();
      expect(listItemBase._Container.color).toBe(0);
    });
    it('has a focus background', () => {
      listItemBase._focus();
      testRenderer.update();
      expect(listItemBase._Container.color).toBe(getHexColor('ECECF2'));
    });
    it('resets colors on unfocus', () => {
      listItemBase._focus();
      testRenderer.update();

      listItemBase._unfocus();
      testRenderer.update();
      expect(listItemBase._Container.color).toBe(getHexColor('141417'));
    });
  });
});

describe('ListItem', () => {
  let listItem, testRenderer;

  beforeEach(() => {
    [listItem, testRenderer] = createListItem();
    testRenderer.update();
  });

  afterEach(() => {
    listItem = null;
    testRenderer = null;
  });

  it('should render', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a title', () => {
    [listItem, testRenderer] = createListItem({
      title: 'My Title'
    });
    testRenderer.update();
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
    expect(listItem._Title.text.text).toEqual(listItem.title);
  });

  it('should render a subtitle', () => {
    [listItem, testRenderer] = createListItem({
      subtitle: 'My Subtitle'
    });
    testRenderer.update();
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
    expect(listItem._Subtitle.text.text).toEqual(listItem.subtitle);
  });

  it('should render a title and subtitle together', () => {
    [listItem, testRenderer] = createListItem({
      title: 'My Title',
      subtitle: 'My Subtitle'
    });
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an icon', () => {
    [listItem, testRenderer] = createListItem({
      icon: icon
    });
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
    expect(listItem._Icon.src).toEqual(listItem.icon);
  });

  describe('focus', () => {
    beforeEach(() => {
      [listItem, testRenderer] = createListItem({
        title: 'My Title',
        subtitle: 'My Subtitle',
        icon: icon
      });
      listItem._focus();
      testRenderer.update();
    });
    it('focused items transition color', () => {
      expect(listItem._Title.color).toEqual(0xff000000);
      expect(listItem._Subtitle.color).toEqual(0xff000000);
      expect(listItem._Icon.color).toEqual(0xff000000);
    });
    it('unfocused items transition color', () => {
      listItem._unfocus();
      testRenderer.update();

      expect(listItem._Title.color).toEqual(0xffffffff);
      expect(listItem._Subtitle.color).toEqual(0xffffffff);
      expect(listItem._Icon.color).toEqual(0xffffffff);
    });
  });
});

describe('ListItemToggle', () => {
  let listItemToggle, testRenderer;

  beforeEach(() => {
    [listItemToggle, testRenderer] = createListItemToggle();
    testRenderer.update();
  });

  afterEach(() => {
    listItemToggle = null;
    testRenderer = null;
  });

  it('renders', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders in a checked state', () => {
    [listItemToggle, testRenderer] = createListItemToggle({
      checked: true
    });
    testRenderer.update();
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('puts focus on the toggle', () => {
    expect(listItemToggle._getFocused()).toEqual(
      listItemToggle._Toggle._getFocused()
    );
  });

  it('toggles on enter', () => {
    listItemToggle._handleEnter();
    testRenderer.update();

    expect(listItemToggle.isChecked()).toBe(true);
  });

  describe('#toggle', () => {
    it('toggles checked state', () => {
      const spy = spyOn(listItemToggle._Toggle, 'toggle');
      listItemToggle.toggle();
      expect(spy).toHaveBeenCalled();
    });
  });
});
