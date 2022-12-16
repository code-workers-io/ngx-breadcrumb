import { TestBed } from '@angular/core/testing';
import {RouterOutletTrackerService} from "./services/router-outlet-tracker.service";

describe('ActiveComponentTrackerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RouterOutletTrackerService],
    })
  );

  it('should be created', () => {
    const service: RouterOutletTrackerService = TestBed.inject(
      RouterOutletTrackerService
    );
    expect(service).toBeTruthy();
  });
});
