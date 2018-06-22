import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  TopNavModule,
  SideNavModule,
  TOP_NAV_SERVICE,
  HalService,
} from 'op2-living-style-guides';

import { AppComponent } from './app.component';
import { TopNavDataService } from './core/top-nav-data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    TopNavModule,
    SideNavModule,
  ],
  providers: [
    HalService,
    {provide: TOP_NAV_SERVICE, useClass: TopNavDataService},
    {provide: 'domain', useValue: 'http://localhost:8000'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
