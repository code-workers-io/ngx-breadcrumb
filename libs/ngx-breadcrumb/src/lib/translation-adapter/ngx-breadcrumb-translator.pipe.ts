import { Inject, Pipe, PipeTransform } from '@angular/core';
import {
  NGX_TRANSLATION_ADAPTER,
  NgxBreadcrumbTranslationAdapter,
} from './ngx-breadcrumb-translation-adapter';

@Pipe({
  name: 'ngxBreadcrumbTranslator',
})
export class NgxBreadcrumbTranslatorPipe implements PipeTransform {
  constructor(
    @Inject(NGX_TRANSLATION_ADAPTER)
    private translationAdapter: NgxBreadcrumbTranslationAdapter
  ) {}

  transform(value: string | undefined | null, isOmitted: boolean): string {
    if (isOmitted) {
      return value ?? '';
    }
    return this.translationAdapter.translate(value);
  }
}
