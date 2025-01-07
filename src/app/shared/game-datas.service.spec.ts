import { TestBed } from '@angular/core/testing';

import { GameDatasService } from './game-datas.service';

describe('GameDatasService', () => {
  let service: GameDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
