import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EffectsEffects } from './effects.effects';

describe('EffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: EffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(EffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
