import { TestBed } from '@angular/core/testing';

import { ConditionalRenderComponentService } from './conditional-render-component.service';

describe('ConditionalRenderComponentService', () => {
  let service: ConditionalRenderComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionalRenderComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
