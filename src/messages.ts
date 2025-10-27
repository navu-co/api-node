import { ConversationType } from "./common.js";

export interface FetchMessageFilter {
  after?: number;
  conversationTypes?: ConversationType[];
}

export interface FetchMessageDetails {
  visitor: string;
  filter?: FetchMessageFilter;
  limit?: number;
  nextPage?: string;
}



export interface Message {
  id: string;
  at: number;
  visitorId: string;
  conversationType: ConversationType;
  content: string;
  sender: 'visitor' | 'ai' | 'agent';
}

export interface FetchMessageResponse {
  messages: Message[];
  nextPage?: string;
}
