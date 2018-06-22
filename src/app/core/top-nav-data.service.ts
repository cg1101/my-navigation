import { Injectable, Inject } from '@angular/core';

import { TopNavServiceBase, HalLink, DateRange, Timezone } from 'op2-living-style-guides';
import { AccountModel } from './account-model';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class TopNavDataService extends TopNavServiceBase<UserModel, AccountModel> {

  data: TopNavDataService;

  constructor(@Inject('domain') protected domain) {
    super();
    this.data = this;
    const account: AccountModel = {
      accountId: '123',
      name: 'my super account'
    };

    this.data.setAccount(account);
    const user = <UserModel>{
      userId: '123',
      name: {
        firstName: 'John',
        lastName: 'Smith',
      }
    };
    this.data.setUser(user);

    this.data.setMyAccountsLink(<HalLink>{
      rel: 'myaccounts',
      href: this.domain + '/search/myaccounts'
    });

    this.data.setGlobalSearchLink(<HalLink>{
      rel: 'globalsearch',
      href: this.domain + '/search/accounts'
    });

    const now = new Date();
    const aWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    this.data.setDateRange(<DateRange>{
      startDate: aWeekAgo,
      endDate: now,
    });

    // TODO: need to figure out how to get this
    this.data.setUserTimezone(<Timezone>{
      offset: '+1',
      code: 'CET',
      name: 'Central European Time'
    });

    this.data.setSegmentOptions([]);
  }
}
