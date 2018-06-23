import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  readonly LS_SESSION_KEY = '$session';

  readonly SESSION_ENDPOINT = 'http://localhost:8000/api/session';

  readonly LOGIN_URL = '/authentication/login';

  readonly CLAIM_KEY = 'auth:userid';

  readonly USER_ENDPOINT = 'http://localhost:8002/api/users/';

  constructor() {}
}
