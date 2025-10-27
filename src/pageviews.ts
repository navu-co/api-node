import { PageviewFlag } from "./common.js";
import { AcquisitionCampaignType } from "./visitors.js";

export interface FetchPageviewFilter {
  after?: number;
}

export interface FetchPageviewDetails {
  visitorId: string;
  filter?: FetchPageviewFilter;
  limit?: number;
  nextPage?: string;
}

export interface UtmData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface PageviewLinkClickDescriptor {
  at: number;
  url: string;
  newTab?: boolean;
}

export interface PageviewFormSubmissionDescriptor {
  at: number;
  masked?: boolean;
  email?: string;
  name?: string;
  fields?: { [name: string]: string };
  attributes?: { [name: string]: string };
}

export type PageviewSearchDetermination = 'url-query' | 'sidebar-search';

export interface PageviewSearchDescriptor {
  at: number;
  determination: PageviewSearchDetermination;
  term: string;
}


export interface Pageview {
  id: string;
  at: number;
  lastContactAt?: number;
  endedAt?: number;
  restarts?: number;
  visitorId: string;
  url: string;
  utmData?: UtmData;
  canonicalUrl?: string;
  cleanUrl: string;
  contentLanguage?: string;
  language: string;
  referrer?: string;
  published?: number;
  updated?: number;
  robotsContent?: string;
  error404Detected?: boolean;
  pageTitle?: string;
  activity: number;
  maxScrollDepth: number;
  isLanding: boolean;
  channel?: AcquisitionCampaignType;
  flags: PageviewFlag[];
  linkClicks?: PageviewLinkClickDescriptor[];
  formSubmissions?: PageviewFormSubmissionDescriptor[];
  searches?: PageviewSearchDescriptor[];
}

export interface FetchPageviewResponse {
  pageviews: Pageview[];
  nextPage?: string;
}
