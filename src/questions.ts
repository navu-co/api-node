import { DurationDescriptor, GeoLocationDescriptor, QuestionFlag, ResourceDescriptor } from "./common.js";

export interface FetchQuestionFilter {
  after?: number;
  withFlags?: QuestionFlag[];
  withoutFlags?: QuestionFlag[];
}

export interface FetchQuestionDetails {
  questionId?: string;
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
  duration: DurationDescriptor;
}

export interface FetchQuestionResponse {
  questions: Question[];
  nextPage?: string;
}
