import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  HalService,
  LocalstorageService,
  SideNavModule,
  TokenService,
  TopNavModule,
  TOP_NAV_SERVICE
} from 'op2-living-style-guides';

import { AppComponent } from './app.component';
import { TopNavDataService } from './core/top-nav-data.service';
import { EffectsEffects } from './@ngrx/effects.effects';
import { reducer as appReducer } from './@ngrx/reducers/app-state.reducers';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    TopNavModule,
    SideNavModule,
    StoreModule.forRoot({
      app: appReducer
    }),
    EffectsModule.forRoot([EffectsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [
    HalService,
    LocalstorageService,
    TokenService,
    { provide: TOP_NAV_SERVICE, useClass: TopNavDataService },
    { provide: 'domain', useValue: 'http://localhost:8000' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
