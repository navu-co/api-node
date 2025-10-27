/**
 * Type definitions and interfaces for the Navu API.
 */

/**
 * Question flags that can be associated with a question.
 * Used for filtering questions in fetchQuestions.
 */
export type QuestionFlag =
  | 'bot'
  | 'custom-skill'
  | 'note'
  | 'out-of-scope'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'unanswered';

/**
 * Visitor flags that can be associated with a web visitor.
 * Used for filtering visitors in fetchVisitors.
 */
export type VisitorFlag =
  | 'ad-click'
  | 'affiliate'
  | 'bot'
  | 'contact-extra-click'
  | 'contact-message'
  | 'crm-account'
  | 'crm-identity'
  | 'domain'
  | 'email-click'
  | 'follower'
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
  | 'site-search'
  | 'sql';

/**
 * Conversation types for messages exchanged with visitors.
 */
export type ConversationType = 'guide' | 'live-chat' | 'contact-message';

/**
 * Filter options for fetching questions.
 */
export interface FetchQuestionFilter {
  /**
   * Timestamp (milliseconds since epoch) - only include questions after this time.
   * Defaults to 7 days ago if not specified.
   */
  after?: number;

  /**
   * Only include questions that have all of these flags.
   */
  withFlags?: QuestionFlag[];

  /**
   * Only include questions that have none of these flags.
   */
  withoutFlags?: QuestionFlag[];
}

/**
 * Details for fetching questions from the Navu API.
 */
export interface FetchQuestionDetails {
  /**
   * Filter criteria for which questions to return.
   */
  filter?: FetchQuestionFilter;

  /**
   * Maximum number of results to return per page.
   */
  limit?: number;

  /**
   * Pagination token from a previous response to get the next page.
   */
  nextPage?: string;
}

/**
 * Filter options for fetching visitors.
 */
export interface FetchVisitorFilter {
  /**
   * Timestamp (milliseconds since epoch) - only include visitors with last contact after this time.
   * Defaults to 24 hours ago if not specified.
   */
  after?: number;

  /**
   * Only include visitors that have all of these flags.
   */
  withFlags?: VisitorFlag[];

  /**
   * Only include visitors that have none of these flags.
   */
  withoutFlags?: VisitorFlag[];
}

/**
 * Details for fetching visitors from the Navu API.
 */
export interface FetchVisitorDetails {
  /**
   * Filter criteria for which visitors to return.
   */
  filter?: FetchVisitorFilter;

  /**
   * Maximum number of results to return per page.
   */
  limit?: number;

  /**
   * Pagination token from a previous response to get the next page.
   */
  nextPage?: string;
}

/**
 * Filter options for fetching messages.
 */
export interface FetchMessageFilter {
  /**
   * Timestamp (milliseconds since epoch) - only include messages after this time.
   */
  after?: number;

  /**
   * Only include messages from these conversation types.
   */
  conversationTypes?: ConversationType[];
}

/**
 * Details for fetching messages from the Navu API.
 */
export interface FetchMessageDetails {
  /**
   * The visitor ID for which to fetch messages.
   */
  visitor: string;

  /**
   * Filter criteria for which messages to return.
   */
  filter?: FetchMessageFilter;

  /**
   * Maximum number of results to return per page.
   */
  limit?: number;

  /**
   * Pagination token from a previous response to get the next page.
   */
  nextPage?: string;
}

/**
 * Filter options for fetching pageviews.
 */
export interface FetchPageviewFilter {
  /**
   * Timestamp (milliseconds since epoch) - only include pageviews after this time.
   */
  after?: number;
}

/**
 * Details for fetching pageviews from the Navu API.
 */
export interface FetchPageviewDetails {
  /**
   * The visitor ID for which to fetch pageviews.
   */
  visitor: string;

  /**
   * Filter criteria for which pageviews to return.
   */
  filter?: FetchPageviewFilter;

  /**
   * Maximum number of results to return per page.
   */
  limit?: number;

  /**
   * Pagination token from a previous response to get the next page.
   */
  nextPage?: string;
}

/**
 * A question asked by a web visitor to their AI assistant.
 */
export interface Question {
  /**
   * Unique identifier for the question.
   */
  id: string;

  /**
   * Timestamp (milliseconds since epoch) when the question was asked.
   */
  timestamp: number;

  /**
   * The visitor ID who asked the question.
   */
  visitorId: string;

  /**
   * The text of the question.
   */
  question: string;

  /**
   * The AI-generated answer to the question.
   */
  answer?: string;

  /**
   * Flags associated with this question.
   */
  flags: QuestionFlag[];
}

/**
 * Response from the fetchQuestions API.
 */
export interface FetchQuestionResponse {
  /**
   * Array of questions returned.
   */
  questions: Question[];

  /**
   * Pagination token to fetch the next page of results.
   * If undefined, there are no more results.
   */
  nextPage?: string;
}

/**
 * A web visitor tracked by Navu.
 */
export interface Visitor {
  /**
   * Unique identifier for the visitor.
   */
  id: string;

  /**
   * Timestamp (milliseconds since epoch) of the visitor's first visit.
   */
  firstSeen: number;

  /**
   * Timestamp (milliseconds since epoch) of the visitor's last contact.
   */
  lastSeen: number;

  /**
   * Number of times the visitor has visited the website.
   */
  visitCount: number;

  /**
   * Flags associated with this visitor.
   */
  flags: VisitorFlag[];

  /**
   * Email address if known.
   */
  email?: string;

  /**
   * Visitor's name if known.
   */
  name?: string;

  /**
   * Company/organization name if known.
   */
  company?: string;

  /**
   * Domain associated with the visitor if known.
   */
  domain?: string;
}

/**
 * Response from the fetchVisitors API.
 */
export interface FetchVisitorResponse {
  /**
   * Array of visitors returned.
   */
  visitors: Visitor[];

  /**
   * Pagination token to fetch the next page of results.
   * If undefined, there are no more results.
   */
  nextPage?: string;
}

/**
 * A message exchanged with a visitor.
 */
export interface Message {
  /**
   * Unique identifier for the message.
   */
  id: string;

  /**
   * Timestamp (milliseconds since epoch) when the message was sent.
   */
  timestamp: number;

  /**
   * The visitor ID associated with this message.
   */
  visitorId: string;

  /**
   * The type of conversation this message belongs to.
   */
  conversationType: ConversationType;

  /**
   * The text content of the message.
   */
  content: string;

  /**
   * Who sent the message: 'visitor', 'ai', or 'agent'.
   */
  sender: 'visitor' | 'ai' | 'agent';
}

/**
 * Response from the fetchMessages API.
 */
export interface FetchMessageResponse {
  /**
   * Array of messages returned.
   */
  messages: Message[];

  /**
   * Pagination token to fetch the next page of results.
   * If undefined, there are no more results.
   */
  nextPage?: string;
}

/**
 * A pageview recorded for a visitor.
 */
export interface Pageview {
  /**
   * Unique identifier for the pageview.
   */
  id: string;

  /**
   * Timestamp (milliseconds since epoch) when the page was viewed.
   */
  timestamp: number;

  /**
   * The visitor ID who viewed the page.
   */
  visitorId: string;

  /**
   * The URL of the page that was viewed.
   */
  url: string;

  /**
   * The title of the page if available.
   */
  title?: string;

  /**
   * The referrer URL if available.
   */
  referrer?: string;

  /**
   * Duration in milliseconds the visitor spent on this page.
   */
  duration?: number;
}

/**
 * Response from the fetchPageviews API.
 */
export interface FetchPageviewResponse {
  /**
   * Array of pageviews returned.
   */
  pageviews: Pageview[];

  /**
   * Pagination token to fetch the next page of results.
   * If undefined, there are no more results.
   */
  nextPage?: string;
}
