import { SecondAidAngularPage } from './app.po';

describe('second-aid-angular App', function() {
  let page: SecondAidAngularPage;

  beforeEach(() => {
    page = new SecondAidAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
