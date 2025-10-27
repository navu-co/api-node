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
