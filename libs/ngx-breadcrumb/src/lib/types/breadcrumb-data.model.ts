/**
 * Data structure definition for breadcrumb data.
 *
 * * return type of {@link `BreadcrumbProvider.create()`} method
 * * data structure for Route data
 */
export interface BreadcrumbData {
  label?: string ;
  link?: string | boolean | null | undefined;
}

/**
 * Typeguard function for {@link 'BreadcrumbData'} interface.
 *
 * @param arg
 */
export function isBreadcrumbData(arg: any): arg is BreadcrumbData {
  const tmp = arg as BreadcrumbData;
  const b1 = typeof tmp.label === 'string';
  // const b2 = tmp.label instanceof Observable;
  const b3 = 'boolean string'.includes(typeof tmp.link);
  return b1 || b3 // || b2;
}
