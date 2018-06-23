import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { ApplicationState, reducer as appReducer } from './app-state.reducers';

// export interface State {
//   app: ApplicationState;
// }

// export const reducers: ActionReducerMap<State> = {
//   app: appReducer
// };

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
