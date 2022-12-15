import { ReplaySubject } from 'rxjs';

/**
 * Domain model for {@link BreadcrumbComponent}.
 *
 * Takes a string or an observable of string as title attribute.
 * Strings are always wrapped into an observable using the Rxjs `of(...)` operator.
 *
 * The optional `url` attribute may be a valid _route_ or an _external URL_.
 */
export class Breadcrumb {
  //readonly title$: Observable<string>;
  title: string | undefined;
   url: string | undefined | null;

  constructor(title: string| undefined,  url?: string | null | undefined) {
    this.title = title;
    this.url = url
    const observer = new ReplaySubject<string>();
    //this.title$ = observer.asObservable();
   //if (title) {
     //(title instanceof Observable ? title : of(title)).subscribe(observer);
   //}
  }
}
