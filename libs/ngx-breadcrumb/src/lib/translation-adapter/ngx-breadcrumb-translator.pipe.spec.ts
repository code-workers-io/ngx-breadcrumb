import { NgxBreadcrumbTranslatorPipe } from './ngx-breadcrumb-translator.pipe';
import { NgxBreadcrumbTranslationAdapter } from './ngx-breadcrumb-translation-adapter';

describe('NgxBreadcrumbTranslatorPipe', () => {
  it('create an instance', () => {
    const pipe = new NgxBreadcrumbTranslatorPipe(mockDefaultNgxBreadcrumbTranslationAdapterService());
    expect(pipe).toBeTruthy();
  });
});

function mockDefaultNgxBreadcrumbTranslationAdapterService(): NgxBreadcrumbTranslationAdapter {
  return {
    translate: jest.fn(),
  };
}
