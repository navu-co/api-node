
export interface FetchConversationMetricsResponse {
  schema: MetricsSchemaItem[];
  rows: ConversationMetricsItem[];
}

export interface ConversationMetricsItem {
  date: string; /** ISODate */
  questions: number;
  visitorsWithQuestions: number;
  messagesLeft: number;
}

export interface MetricsSchemaItem {
  name: string;
  type: SchemaItemType;
  description: string;
}

export type SchemaItemType = 'DATE' | 'NUMBER' | 'STRING' | 'BOOLEAN';
