/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcService } from './proc.service';

describe('ProcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcService]
    });
  });

  it('should ...', inject([ProcService], (service: ProcService) => {
    expect(service).toBeTruthy();
  }));
});
