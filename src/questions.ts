import { GeoLocationDescriptor, ResourceDescriptor } from "./common.js";

export type QuestionFlag =
  | 'bot'
  | 'custom-skill'
  | 'note'
  | 'out-of-scope'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'unanswered'
  | 'preview';

export interface FetchQuestionFilter {
  after?: number;
  withFlags?: QuestionFlag[];
  withoutFlags?: QuestionFlag[];
}

export interface FetchQuestionDetails {
  filter?: FetchQuestionFilter;
  limit?: number;
  nextPage?: string;
}


export interface QuestionVisitorDescriptor {
  id: string;
  emailAddresses?: string[];
  geolocation?: GeoLocationDescriptor;
}

export interface QuestionSkillDescriptor {
  id: string;
  name: string;
}

export type QuestionResponseType = 'guide-response' | 'search-result';

export interface QuestionSearchResult {
  title?: string;
  description?: string;
  url: string;
  imageUrl?: string;
}

export interface QuestionResponseDescriptor {
  type: QuestionResponseType;
}

export interface QuestionGuideResponseDescriptor extends QuestionResponseDescriptor {
  type: 'guide-response';
  response?: string;
  citations?: ResourceDescriptor[];
}

export interface QuestionSearchResponseDescriptor extends QuestionResponseDescriptor {
  type: 'search-result';
  searchResults?: ResourceDescriptor[];
}

export type QuestionSource = 'suggested' | 'linked' | 'text-entry' | 'introduction' | 'bubble-suggestion' | 'bubble-prompt';
export type QuestionReaction = 'thumbs-up' | 'thumbs-down';

export interface QuestionDurationDescriptor {
  timeToStart: number;
  totalTimeToComplete: number;
}

export interface Question {
  id: string;
  at: number;
  visitor: QuestionVisitorDescriptor;
  prompt: string;
  response: QuestionGuideResponseDescriptor | QuestionSearchResponseDescriptor;
  flags: QuestionFlag[];
  skill?: QuestionSkillDescriptor;
  topic?: string;
  source: QuestionSource;
  reaction?: QuestionReaction;
  note?: string;
  duration: QuestionDurationDescriptor;
}

export interface FetchQuestionResponse {
  questions: Question[];
  nextPage?: string;
}
