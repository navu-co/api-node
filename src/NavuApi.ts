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
    if (!siteCode || siteCode.trim() === '') {
      throw new Error('siteCode is required');
    }
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('apiKey is required');
    }
    if (!apiKey.startsWith('ak_')) {
      throw new Error('apiKey must start with "ak_"');
    }

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
}
