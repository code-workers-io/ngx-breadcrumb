import { Pipe, PipeTransform } from '@angular/core';
import { injectNgxBreadcrumbTranslationAdapter } from './ngx-breadcrumb-translation-adapter';

@Pipe({
  name: 'ngxBreadcrumbTranslator',
  standalone: true,
})
export class NgxBreadcrumbTranslatorPipe implements PipeTransform {
  private translationAdapter = injectNgxBreadcrumbTranslationAdapter();

  transform(value: string | undefined | null, isOmitted: boolean): string {
    if (isOmitted) {
      return value ?? '';
    }
    return this.translationAdapter.translate(value);
  }
}
