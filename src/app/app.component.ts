import { Component, HostListener, HostBinding } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { NavigationNode } from 'op2-living-style-guides';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nav: NavigationNode[] = [];
  adminNav: NavigationNode[] = [];

  showSideNav$: Observable<boolean>;
  showTopNav$: Observable<boolean>;

  _showSideNav$ = new BehaviorSubject<boolean>(false);
  _showTopNav$ = new BehaviorSubject<boolean>(false);

  _class = {
    top: 'top-nav-1',
    side: 'side-nav-2'
  };

  @HostBinding('class')
  get navClasses() {
    return `${this._class.top} ${this._class.side}`;
  }

  @HostListener('document:click', ['$event'])
  changeSideNavClass(event: Event) {
    let top = this._class.top;
    let side = this._class.side;
    if (event.target.tagName === 'SECTION') {
      side = side === 'side-nav-0' ? 'side-nav-1' : (side === 'side-nav-1' ? 'side-nav-2' : 'side-nav-0');
    } else {
      top = top === 'top-nav-0' ? 'top-nav-1' : 'top-nav-0';
    }
    this._class = {top, side};
  }

  constructor() {
    this.showSideNav$ = this._showSideNav$.asObservable();
    this.showTopNav$ = this._showTopNav$.asObservable();
  }
}
