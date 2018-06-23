import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { pluck, switchMap, catchError, map, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LocalstorageService, TokenService } from 'op2-living-style-guides';
import {
  AppActionsUnion,
  AppActionTypes,
  SavedSessionLoaded,
  RefreshSession,
  RefreshSessionSuccess,
  RefreshSessionFailed,
  StartLogin,
  GetUser,
  GetUserSuccess,
  GetUserError
} from './actions/app-state.actions';

import { AppConfigService } from '../core/app-config.service';
import { SessionResource } from '../core/session-model';

@Injectable()
export class EffectsEffects {
  @Effect() loadSavedSession$: Observable<Action>;
  @Effect() savedSessionLoaded$: Observable<Action>;
  @Effect() refreshSession$: Observable<Action>;
  @Effect() refreshSessionSuccess$: Observable<Action>;
  @Effect() refreshSessionFail$: Observable<Action>;
  @Effect({ dispatch: false })
  startLogin$: Observable<Action>;
  @Effect() getUser$: Observable<Action>;

  constructor(
    private actions$: Actions,
    protected ls: LocalstorageService,
    protected cfg: AppConfigService,
    protected tokenService: TokenService,
    protected http: HttpClient
  ) {
    this.loadSavedSession$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.LoadSavedSession)
      .pipe(
        switchMap(() => {
          const session = <SessionResource>(
            this.ls.getItem(this.cfg.LS_SESSION_KEY)
          );
          return of(new SavedSessionLoaded(session));
        })
      );

    this.savedSessionLoaded$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.SavedSessionLoaded)
      .pipe(
        switchMap(() => {
          return of(new RefreshSession());
        })
      );

    this.refreshSession$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.RefreshSession)
      .pipe(
        switchMap(() => {
          return this.http
            .get(this.cfg.SESSION_ENDPOINT, { observe: 'response' })
            .pipe(
              tap(resp => {
                console.log('received response', resp);
              }),
              pluck<HttpResponse<SessionResource>, SessionResource>('body'),
              switchMap((session: SessionResource) => {
                console.log('refresh token received', session);
                return of(new RefreshSessionSuccess(session));
              }),
              catchError(error => {
                console.error('Refresh Session Failed', error);
                return of(new RefreshSessionFailed(error));
              })
            );
        })
      );

    this.refreshSessionSuccess$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.RefreshSessionSuccess)
      .pipe(
        switchMap((action: RefreshSessionSuccess) => {
          this.ls.setItem(this.cfg.LS_SESSION_KEY, action.session);
          const userId = this.tokenService.getClaim(this.cfg.CLAIM_KEY);
          return of(new GetUser(userId));
        })
      );

    this.refreshSessionFail$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.RefreshSessionFailed)
      .pipe(
        switchMap(() => {
          const url = window.location.href;
          return of(new StartLogin(url));
        })
      );

    this.startLogin$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.StartLogin)
      .pipe(
        switchMap((action: StartLogin) => {
          const queryParams = { redirect: action.url };
          console.log('redirect to login url', action.url);
          return of(null);
        })
      );
    this.getUser$ = this.actions$
      .ofType<AppActionsUnion>(AppActionTypes.GetUser)
      .pipe(
        switchMap((action: GetUser) => {
          return this.http
            .get(`${this.cfg.USER_ENDPOINT}${action.userId}`)
            .pipe(
              map(resp => resp),
              switchMap(user => {
                return of(new GetUserSuccess(user));
              }),
              catchError(error => {
                console.error(`error loading user ${action.userId}`);
                return of(new GetUserError(error));
              })
            );
        })
      );
  }
}
