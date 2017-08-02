import { TestAppKendoUIPage } from './app.po';

describe('test-app-kendo-ui App', () => {
  let page: TestAppKendoUIPage;

  beforeEach(() => {
    page = new TestAppKendoUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
