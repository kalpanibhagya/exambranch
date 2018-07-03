import { TestBed, inject } from '@angular/core/testing';

import { RepeatService } from './repeat.service';

describe('RepeatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepeatService]
    });
  });

  it('should be created', inject([RepeatService], (service: RepeatService) => {
    expect(service).toBeTruthy();
  }));
});
