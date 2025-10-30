import { GeoLocationDescriptor, VisitorFlag } from "./common.js";

export interface FetchVisitorFilter {
  after?: number;
  withFlags?: VisitorFlag[];
  withoutFlags?: VisitorFlag[];
}

export interface FetchVisitorDetails {
  filter?: FetchVisitorFilter;
  limit?: number;
  nextPage?: string;
}

export interface VisitorTimestamps {
  firstSeen: number;
  lastContact: number;
}

export interface VisitorEngagement {
  pageviews: number;
  uniquePageCount: number;
  activity: number;
  visitDays: number;
  guideQuestions: number;
}

export type DeviceType = 'desktop' | 'phone' | 'tablet' | 'other';

export interface Dimensions {
  width: number;
  height: number;
}

export type PrivacyConsentState = 'granted-implicit' | 'granted-explicit' | 'disallowed-implicit' | 'disallowed-explicit';

export type BotDetectionType = 'normal' | 'bot' | 'data-center' | 'user-agent';

export type AcquisitionChannel = 'advertising' | 'home-direct' | 'direct' | 'referral' | 'organic-search' | 'organic-social' | 'email' | 'home-search' | 'home-social' | 'other' | 'navu-preview' | 'none';

export type VisitorIdentityType = 'form-submission' | 'google-analytics' | 'hubspot' | 'hubspot-domain' | 'marketo' | 'marketo-domain' | 'navu-panel' | 'salesforce' | 'salesforce-domain' | 'ip-address' | 'chatbot' | 'navu-contact-form' | 'navu-assistant';


export interface VisitorIdentityDetails {
  type: VisitorIdentityType;
  masked?: boolean;
  email?: string;
  name?: string;
  domain?: string;
  companyName?: string;
  hubspotVid?: number;
  hubspotCompanyId?: number;
  salesforceContactId?: string;
  salesforceLeadId?: string;
  salesforceAccountId?: string;
}

export interface VisitorMetadata {
  deviceType: DeviceType;
  timezoneOffsetMinutes?: number;
  display?: Dimensions;
  browserLanguage?: string; // as reported by navigator.language
  contentLanguage?: string; // from lang attribute in html tag
  doNotTrack?: string; // as reported by navigator.doNotTrack
  globalPrivacyControl?: boolean; // as reported by navigator.globalPrivacyControl
  userAgent?: string;
  adBlockerDetected?: boolean;
  usPrivacyString?: string;
  consent?: PrivacyConsentState;
  isGdpr?: boolean;
  botDetection?: BotDetectionType;
}

export interface VisitorCrmInfo {
  hubspotUtk?: string;
  marketoTrk?: string;
  salesforceVisitorIdSuffix?: string;
  salesforceVisitorIdValue?: string;
}

export interface Visitor {
  id: string;
  geolocation?: GeoLocationDescriptor;
  timestamps: VisitorTimestamps;
  engagement: VisitorEngagement;
  flags: VisitorFlag[];
  metadata: VisitorMetadata;
  crm?: VisitorCrmInfo;
  channels: AcquisitionChannel[];
  identities: VisitorIdentityDetails[];
  convertedAt?: number;
  profile?: string;
}

export interface FetchVisitorResponse {
  visitors: Visitor[];
  nextPage?: string;
}
