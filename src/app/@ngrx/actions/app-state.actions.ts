import { Action } from '@ngrx/store';
import { SessionResource } from '../../core/session-model';

export enum AppActionTypes {
  LoadSavedSession = '[App] Load Saved Session',
  SavedSessionLoaded = '[App] Saved Session Loaded',
  RefreshSession = '[App] Refresh Session',
  RefreshSessionSuccess = '[App] Refresh Session Success',
  RefreshSessionFailed = '[App] Refresh Session Failed',
  StartLogin = '[App] Start Login',
  GetUser = '[App] Get User',
  GetUserSuccess = '[App] Get User Success',
  GetUserError = '[App] Get User Error'
}

export class LoadSavedSession implements Action {
  readonly type = AppActionTypes.LoadSavedSession;
}

export class SavedSessionLoaded implements Action {
  readonly type = AppActionTypes.SavedSessionLoaded;

  constructor(public session: SessionResource) {}
}

export class RefreshSession implements Action {
  readonly type = AppActionTypes.RefreshSession;
}

export class RefreshSessionSuccess implements Action {
  readonly type = AppActionTypes.RefreshSessionSuccess;

  constructor(public session: SessionResource) {}
}

export class RefreshSessionFailed implements Action {
  readonly type = AppActionTypes.RefreshSessionFailed;

  constructor(public error: any) {}
}

export class StartLogin implements Action {
  readonly type = AppActionTypes.StartLogin;

  constructor(public url: string) {}
}

export class GetUser implements Action {
  readonly type = AppActionTypes.GetUser;

  constructor(public userId: string) {}
}

export class GetUserSuccess implements Action {
  readonly type = AppActionTypes.GetUserSuccess;

  constructor(public user: any) {}
}

export class GetUserError implements Action {
  readonly type = AppActionTypes.GetUserError;

  constructor(public error: any) {}
}

export type AppActionsUnion =
  | LoadSavedSession
  | SavedSessionLoaded
  | RefreshSession
  | RefreshSessionSuccess
  | RefreshSessionFailed
  | StartLogin
  | GetUser
  | GetUserSuccess
  | GetUserError;
