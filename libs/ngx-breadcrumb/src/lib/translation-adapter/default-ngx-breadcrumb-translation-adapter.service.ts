import { Injectable } from '@angular/core';
import { NgxBreadcrumbTranslationAdapter } from './ngx-breadcrumb-translation-adapter';

@Injectable({
  providedIn: 'root'
})
export class DefaultNgxBreadcrumbTranslationAdapterService implements NgxBreadcrumbTranslationAdapter{

  constructor() { }

  translate(key: string | undefined | null): string  {
    // by default we do not translate
    return key ?? '';
  }

}
