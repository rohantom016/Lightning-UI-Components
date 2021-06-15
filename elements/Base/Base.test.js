import TestUtils from '../../test/lightning-test-utils';
import Base from '.';

const createComponent = TestUtils.makeCreateComponent(Base);

describe('Base', () => {
  let component, testRenderer;

  beforeEach(() => {
    [component, testRenderer] = createComponent();
  });
  afterEach(() => {
    component = null;
    testRenderer = null;
  });

  it('renders', () => {
    const tree = testRenderer.toJSON(2);
    expect(tree).toMatchSnapshot();
  });
});