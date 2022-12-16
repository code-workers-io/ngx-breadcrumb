import { RouterOutletTrackerDirective } from './router-outlet-tracker.directive';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {RouterOutletTrackerService} from "./services/router-outlet-tracker.service";

@Component({
  template: ` <router-outlet></router-outlet>`,
})
class TestComponent {}

describe('ComponentActivationTrackerDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestComponent, RouterOutletTrackerDirective],
      providers: [RouterOutletTrackerService],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const component = TestBed.createComponent(TestComponent);
    const debugElement = component.debugElement.query(
      By.directive(RouterOutletTrackerDirective)
    );
    expect(
      debugElement.injector.get(RouterOutletTrackerDirective)
    ).toBeTruthy();
  });
});
