export type ConversationType = 'guide' | 'live-chat' | 'contact-message';


export interface GeoLocationDescriptor {
  countryCode?: string;
  region?: string;
  city?: string;
}

export interface ResourceDescriptor {
  url?: string;
  imageUrl?: string;
  section?: string;
  title?: string;
  titleHtml?: string;
  description?: string;
  descriptionHtml?: string;
  author?: string;
  authorHtml?: string;
  published?: number;
  lastModified?: number;
  language?: string;
}

export interface DurationDescriptor {
  timeToStart: number;
  totalTimeToComplete: number;
}

export type VisitorFlag =
  | 'ad-click'
  | 'affiliate'
  | 'contact-extra-click'
  | 'contact-message'
  | 'crm-account'
  | 'crm-identity'
  | 'domain'
  | 'email-click'
  | 'form-submit'
  | 'guide-entry'
  | 'guide-question'
  | 'high-value'
  | 'identity'
  | 'link-click'
  | 'live-chat-requested'
  | 'mql'
  | 'multi-day'
  | 'navu-click'
  | 'navu-close'
  | 'navu-open'
  | 'navu-preview'
  | 'navu-user'
  | 'navu-viewer'
  | 'qualified'
  | 'site-search';

export type PageviewFlag =
  | 'ad-click'
  | 'client-side-navigation'
  | 'contact-extra-click'
  | 'contact-message'
  | 'crm-account'
  | 'crm-identity'
  | 'domain'
  | 'email-click'
  | 'form-submit'
  | 'guide-entry'
  | 'guide-question'
  | 'identity'
  | 'link-click'
  | 'live-chat-requested'
  | 'mql'
  | 'navu-click'
  | 'navu-close'
  | 'navu-open'
  | 'navu-preview'
  | 'navu-user'
  | 'navu-viewer'
  | 'qualified'
  | 'site-search';

export type QuestionFlag =
  | 'custom-skill'
  | 'tool'
  | 'note'
  | 'out-of-scope'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'unanswered'
  | 'assisted-entry'
  | 'preview';
