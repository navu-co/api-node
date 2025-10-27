/**
 * NavuApi is the main entry point for interacting with the Navu API.
 * It provides methods to fetch questions, visitors, messages, and pageviews.
 */
export class NavuApi {
  private readonly siteCode: string;
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.navu.co';

  /**
   * Creates a new NavuApi instance.
   * @param siteCode - Your Navu site code
   * @param apiKey - Your Navu API key (starts with 'ak_')
   */
  constructor(siteCode: string, apiKey: string) {
    this.siteCode = siteCode;
    this.apiKey = apiKey;
  }

  /**
   * Gets the site code for this API instance.
   */
  public getSiteCode(): string {
    return this.siteCode;
  }

  /**
   * Gets the base URL for API requests.
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Constructs the full URL for a specific API endpoint.
   * @param endpoint - The API endpoint (e.g., 'fetch-questions')
   */
  protected buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${this.siteCode}/v1/${endpoint}`;
  }

  /**
   * Gets the authorization header value.
   */
  protected getAuthHeader(): string {
    return `Bearer ${this.apiKey}`;
  }

  /**
   * Makes a POST request to the Navu API with retry logic for rate limiting.
   * @param endpoint - The API endpoint to call
   * @param body - The request body to send
   * @returns The response data
   */
  private async makeRequest<T>(endpoint: string, body: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    let delay = 1000; // Start with 1 second delay
    const maxRetries = 10;
    let attempt = 0;

    while (attempt < maxRetries) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getAuthHeader(),
        },
        body: JSON.stringify(body),
      });

      if (response.status === 429) {
        // Rate limited - wait and retry with exponential backoff
        attempt++;
        if (attempt >= maxRetries) {
          throw new Error(`Rate limit exceeded after ${maxRetries} retries`);
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Double the delay for exponential backoff
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }

      return (await response.json()) as T;
    }

    throw new Error('Maximum retry attempts exceeded');
  }

  /**
   * Fetches questions from the Navu API.
   * @param details - The details for fetching questions
   * @returns The response containing questions data
   */
  public async postFetchQuestions(details: unknown): Promise<unknown> {
    return this.makeRequest('fetch-questions', details);
  }

  /**
   * Fetches visitors from the Navu API.
   * @param details - The details for fetching visitors
   * @returns The response containing visitors data
   */
  public async postFetchVisitors(details: unknown): Promise<unknown> {
    return this.makeRequest('fetch-visitors', details);
  }

  /**
   * Fetches messages from the Navu API.
   * @param details - The details for fetching messages
   * @returns The response containing messages data
   */
  public async postFetchMessages(details: unknown): Promise<unknown> {
    return this.makeRequest('fetch-messages', details);
  }

  /**
   * Fetches pageviews from the Navu API.
   * @param details - The details for fetching pageviews
   * @returns The response containing pageviews data
   */
  public async postFetchPageviews(details: unknown): Promise<unknown> {
    return this.makeRequest('fetch-pageviews', details);
  }
}
