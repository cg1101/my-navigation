import { TestBed, inject } from '@angular/core/testing';

import { TopNavDataService } from './top-nav-data.service';

describe('TopNavDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopNavDataService]
    });
  });

  it('should be created', inject([TopNavDataService], (service: TopNavDataService) => {
    expect(service).toBeTruthy();
  }));
});
