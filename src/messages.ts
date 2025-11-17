import { ConversationType, DurationDescriptor, ResourceDescriptor } from "./common.js";

export interface FetchMessageFilter {
  after?: number;
}

export interface FetchMessageDetails {
  visitorId: string;
  conversationType: ConversationType;
  filter?: FetchMessageFilter;
  limit?: number;
  nextPage?: string;
}

export type MessageSourceRole = 'visitor' | 'guide' | 'agent' | 'system';
export type MessagePresentation = 'chat-message' | 'site-search-request' | 'welcome' | 'page-summary' | 'guide-content-card' | 'guide-search-suggestion' | 'system-message' | 'chat-request' | 'deferred-chat-message' | 'guide-search-results' | 'guide-initiation' | 'prompt-card';


export interface Message {
  id: string;
  at: number;
  visitorId: string;
  visitorEmail?: string;
  from?: string; // For live-chat only, this is the agent's name if available
  conversationId?: string; // For associating different conversations together
  conversationType: ConversationType;
  sourceRole: MessageSourceRole;
  presentation: MessagePresentation;
  content?: string; // markdown
  resources?: ResourceDescriptor[]; // citations or search results
  duration?: DurationDescriptor;
  questionId?: string; // If the message is associated with a question
}

export interface FetchMessageResponse {
  messages: Message[];
  nextPage?: string;
}
