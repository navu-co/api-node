
export interface FetchPageviewFilter {
  after?: number;
}

export interface FetchPageviewDetails {
  visitor: string;
  filter?: FetchPageviewFilter;
  limit?: number;
  nextPage?: string;
}

export interface Pageview {
  id: string;
  at: number;
  visitorId: string;
  url: string;
  title?: string;
  referrer?: string;
  duration?: number;
}

export interface FetchPageviewResponse {
  pageviews: Pageview[];
  nextPage?: string;
}
