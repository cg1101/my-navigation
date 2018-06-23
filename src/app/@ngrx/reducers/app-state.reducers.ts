import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { AppActionsUnion, AppActionTypes } from '../actions/app-state.actions';
import { SessionResource } from '../../core/session-model';
import { UserModel } from '../../core/user-model';
import { AccountModel } from '../../core/account-model';

export interface ApplicationState {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  session: SessionResource;
  user: UserModel;
  account: AccountModel;
}
export const initialState: ApplicationState = {
  isLoggedIn: false,
  isLoggingIn: false,
  session: null,
  user: null,
  account: null
};

export function reducer(
  state: ApplicationState = initialState,
  action: AppActionsUnion
): ApplicationState {
  switch (action.type) {
    case AppActionTypes.LoadSavedSession: {
      return {
        ...initialState
      };
    }
    case AppActionTypes.SavedSessionLoaded: {
      return {
        ...state,
        session: action.session
      };
    }
    case AppActionTypes.RefreshSession: {
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true
      };
    }
    case AppActionTypes.RefreshSessionSuccess: {
      const session = {
        ...action.session
      };
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        session: session
      };
    }
    case AppActionTypes.RefreshSessionFailed: {
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false
      };
    }
    default: {
      return state;
    }
  }
}
