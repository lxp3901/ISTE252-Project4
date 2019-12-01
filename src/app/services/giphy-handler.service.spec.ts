import { TestBed } from '@angular/core/testing';

import { GiphyHandlerService } from './giphy-handler.service';

describe('GiphyHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiphyHandlerService = TestBed.get(GiphyHandlerService);
    expect(service).toBeTruthy();
  });
});
