/**
 * Generic cursor for iterating through paginated API results.
 * Handles automatic paging and provides convenient iteration methods.
 */
export class Cursor<T, D, R extends { nextPage?: string }> {
  private items: T[] = [];
  private currentIndex = 0;
  private nextPageToken?: string;
  private hasMorePages = true;
  private closed = false;

  /**
   * Creates a new cursor.
   * @param details - The initial fetch details
   * @param fetchFunction - The function to call to fetch the next page
   * @param extractItems - Function to extract items array from the response
   */
  constructor(
    private readonly details: D,
    private readonly fetchFunction: (details: D) => Promise<R>,
    private readonly extractItems: (response: R) => T[]
  ) {}

  /**
   * Checks if there are more items to iterate through.
   * @returns True if there are more items available
   */
  async hasNext(): Promise<boolean> {
    if (this.closed) {
      return false;
    }

    // If we have items in the buffer, return true
    if (this.currentIndex < this.items.length) {
      return true;
    }

    // If we have no more pages to fetch, return false
    if (!this.hasMorePages) {
      return false;
    }

    // Try to fetch the next page
    await this.fetchNextPage();

    // Check again if we have items
    return this.currentIndex < this.items.length;
  }

  /**
   * Gets the next item in the iteration.
   * @returns The next item, or undefined if no more items
   */
  async next(): Promise<T | undefined> {
    if (this.closed) {
      throw new Error('Cursor has been closed');
    }

    // Ensure we have items to return
    const hasItems = await this.hasNext();
    if (!hasItems) {
      return undefined;
    }

    // Return the next item and increment the index
    return this.items[this.currentIndex++];
  }

  /**
   * Closes the cursor and releases any resources.
   * After closing, the cursor cannot be used anymore.
   */
  async close(): Promise<void> {
    this.closed = true;
    this.items = [];
    this.currentIndex = 0;
    this.hasMorePages = false;
  }

  /**
   * Fetches the next page of results from the API.
   */
  private async fetchNextPage(): Promise<void> {
    if (!this.hasMorePages) {
      return;
    }

    // Prepare the details for the next page
    const requestDetails = this.nextPageToken
      ? { ...this.details, nextPage: this.nextPageToken }
      : this.details;

    // Fetch the next page
    const response = await this.fetchFunction(requestDetails as D);

    // Extract items from the response
    const newItems = this.extractItems(response);
    this.items = newItems;
    this.currentIndex = 0;

    // Update pagination state
    this.nextPageToken = response.nextPage;
    this.hasMorePages = !!response.nextPage;
  }
}
