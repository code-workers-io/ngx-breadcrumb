import { Injectable, Type } from '@angular/core';

/**
 * This service is used for tracking which components are currently 'active' (meaning that they have been activated by the Angular's
 * router). {@link RouterOutletTrackerDirective} provides the information about component activation and deactivation.
 *
 * Please note that components are stored in a set to avoid duplicates.
 * Components are identified by their {@link Type}. That means, you cannot distinguish
 * between multiple component instances of the same type.
 */
@Injectable({ providedIn: 'root' })
export class RouterOutletTrackerService {
  private activeComponents = new Set<any>();

  /**
   * Adds a component instance to the `Set` of activated components
   *
   * @param component
   */
  componentActivated(component: any) {
    this.activeComponents.add(component);
  }

  /**
   * Removes a component instance from the `Set` of activated components
   * @param component
   */
  componentDeactivated(component: any) {
    this.activeComponents.delete(component);
  }

  /**
   * Returns the active component instance of the given `Type` or `null`
   *
   * @param type
   */
  getActiveComponent(type: any) {
    if (type instanceof Type) {
      const it = this.activeComponents.values();
      let item;
      do {
        item = it.next();
        if (item.value && item.value instanceof type) {
          return item.value;
        }
      } while (!item.done);
    }
    return null;
  }
}
