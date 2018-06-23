export interface Link {
  href: string;
  method: string;
  rel: string;
  templated: boolean;
}

export interface SessionHal {
  delete_session: Link;
  self: Link;
  help: Link;
  user_management: Link;
  op2_menu: Link;
}

export interface SessionResource {
  sessionToken: string;
  valetToken: string;
  homePage: string;
  tokenSetTimestamp: number;
  _links: SessionHal;
}
