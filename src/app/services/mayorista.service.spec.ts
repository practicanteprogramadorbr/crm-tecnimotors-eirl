import { TestBed } from '@angular/core/testing';

import { MayoristaService } from './mayorista.service';

describe('MayoristaService', () => {
  let service: MayoristaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayoristaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
