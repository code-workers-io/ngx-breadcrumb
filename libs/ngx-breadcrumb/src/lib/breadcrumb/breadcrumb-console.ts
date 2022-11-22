export class BreadcrumbConsoleSettings {
  static enabled = false;
}

export function log(message?: any, ...optionalParams: any[]): void {
  if (BreadcrumbConsoleSettings.enabled) {
    console.log(message, ...optionalParams);
  }
}
export function error(message?: any, ...optionalParams: any[]): void {
  if (BreadcrumbConsoleSettings.enabled) {
    console.error(message, ...optionalParams);
  }
}
export function warn(message?: any, ...optionalParams: any[]): void {
  if (BreadcrumbConsoleSettings.enabled) {
    console.warn(message, ...optionalParams);
  }
}
