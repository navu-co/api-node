# api-node
This is the API for Navu customers to programmatically access data about their website.

## Getting Started
If you don't already have a Navu site, visit [navu.co](https://navu.co), click Get Started, enter your domain and wait for your new site to be constructed.  Get your site code and API key from your Navu portal.

In your node project, install this library:
```
npm install --save @navu-co/api-node
```

In your code, import the library, create a NavuApi object and use it to access data:
```typescript
import { NavuApi } from '@navu-co/api-node';

const navuApi = new NavuApi(YOUR_SITE_CODE, YOUR_API_KEY);
const questionCursor = await navuApi.fetchVisitors({ filter: { after: Date.now() - 7 * 24 * 60 * 60 * 1000 }} );
try {
  while (await questionCursor.hasNext()) {
    const question = await questionCursor.next();
    if (question) {
      // Do whatever you want with the question record
      console.log(question);
    }
  }
} catch (err) {
  console.log(`Navu failure: ${err}`);
  throw err;
} finally {
  await questionCursor.close();
}
```

## Authentication
To authenticate your requests, you will need an API Key.  In your Navu portal, under "More" click on "API Keys".
Create a key and save it in a secure place.  After creating it you will not be able to get it again.  If you lose
your key, you will need to create a new one.  Your API Key is a string that starts with `ak_` followed by a long
string of alphanumeric characters.

## Questions
To fetch the questions that have been asked by web visitors to their Navu AI assistants, use `fetchQuestions`.

The details you provide determines which questions will be returned.  By default, all questions starting 7 days
in the past will be returned in forward chronological order.  Each question has associated flags.  You can specify
which flags the questions must have and/or must not have in order to be included in the results.

You will get back a cursor that you can use to walk all of the questions.  The cursor methods will handle paging and 
throttling.

```typescript
const details: FetchQuestionDetails = {
  filter: {
    after: Date.now() - 7 * 24 * 60 * 60 * 1000,
    withFlags: [],
    withoutFlags: [],
  },
  limit: 10
};
const questionCursor = await navuApi.fetchQuestions(details);
...
```

### Question Flags
Following are the flags that may be associated with a question and can be used to include or exclude questions
in the filter for fetchQuestions:
- **bot**: This question was asked by a visitor who appeared to be a bot
- **custom-skill**:  This question was answered using a custom skill
- **note**:  This question has a note associated with it
- **out-of-scope**:  It appears that this question was "out of scope" meaning that it did not appear to be relevant to the company or website
- **thumbs-up**:  This question was marked with a "thumbs up", suggesting that the answer was particularly good
- **thumbs-down**:  This question was marked with a "thumbs down", suggesting that the answer was disappointing
- **unanswered**:  It appears that the AI was unable to answer this question

## Visitors
To fetch the web visitors that have been tracked by Navu, use `fetchVisitors`.

The details you provide determines which visitors will be returned.  By default, all visitors starting 24 hours
in the past will be returned in forward chronological order based on the time of last contact from that visitor.  
Each visitor has associated flags.  You can specify which flags the questions must have and/or must not have in 
order to be included in the results.  

You will get back a cursor that you can use to walk all of the visitors.  The cursor methods will handle paging and 
throttling.

Note that since the last-contact timestamp associated with a visitor may change at any time, it is possible for the 
same visitor to be included more than once in the results.

```typescript
const details: FetchVisitorDetails = {
  filter: {
    after: Date.now() - 24 * 60 * 60 * 1000,
    withFlags: [],
    withoutFlags: [],
  },
  limit: 10
};
const visitorCursor = await navuApi.fetchVisitors(details);
...
```

### Visitor Flags
Following are the flags associated with a web visitor and can be used to include or exclude visitors in the filter
for fetchVisitors:
- **ad-click**: The visitor arrived on the website at least once by clicking on an advertisement
- **affiliate**: It appears that the visitor is an employee or affiliate of the company
- **bot**: It appears that the visitor is a bot
- **contact-extra-click**: The visitor has clicked on one of the extra buttons on the Navu Contact form
- **contact-message**:  The visitor used the Navu Contact page to leave a message
- **crm-account**: The visitor is associated with a company/account in the CRM
- **crm-identity**: The visitor is associated with a contact in the CRM
- **domain**: The visitor has been associated with a website domain in some way (reverse IP, email address, CRM, etc.)
- **email-click**: The visitor arrived on the website at least once by clicking on a link in an email
- **follower**:  The visitor has visited many times over an extended time period without ever converting
- **form-submit**:  The visitor submitted a form (other than Navu)
- **guide-entry**:  The visitor asked a question to the AI assistant by manually entering it as text
- **guide-question**:  The visitor asked a question to the AI assistant in some way (entering text manually, or otherwise)
- **high-value**: The visitor appears qualified and has demonstrated high engagement
- **identity**:  There is identity information (including email address) associated with the visitor
- **link-click**:  The visitor used a hyperlink (other than Navu) to navigate to a new page on the site
- **live-chat-requested**:  The visitor requested a live chat
- **mql**: The visitor has "converted" -- intentionally offering their identity in some way such as a form fill
- **multi-day**:  This is a return visitor who has visited on more than one day
- **navu-click**:  The visitor has used a hyperlink within the Navu sidebar to navigate to new content
- **navu-close**:  The visitor closed the Navu sidebar at least once during their journey
- **navu-open**:  The visitor opened the Navu sidebar at least once during their journey
- **navu-preview**:  The visitor used Preview
- **navu-user**:  The visitor has used one or more of the Navu sidebar features
- **navu-viewer**:  The visitor has seen an open Navu sidebar at some point during their journey
- **qualified**: The visitor has engaged at least minimally on the website
- **site-search**:  The visitor used the site's built-in site search (non-Navu) capability
- **sql**: The visitor has converted and engaged sufficiently to warrant further attention

## Messages
To fetch the messages exchanged with a specific visitor, use `fetchMessages`.  Messages can be part of
conversations between the visitor and the AI assistant, messages left by the visitor via the Navu sidebar's Contact
page, or part of conversations between the visitor and a live agent (via Slack or Microsoft Teams).

The details you provide determines which messages will be returned.  You must provide a visitor ID, which is 
returned as part of each visitor record via fetchVisitors.  By default, all messages exchanged with that visitor 
will be returned in forward chronological order.  You can specify a filter to limit the messages that are returned.  
For example, you can specify that you only want messages that are part of the "guide" conversation -- meaning messages 
exchanged between the web visitor and the AI assistant.

You will get back a cursor that you can use to walk all of the message.  The cursor methods will handle paging and 
throttling.

Note that if you fetch messages for the same visitor later, you may find additional messages.  The filter includes
an **after** field which you can set to the timestamp of the last message you have previously fetched.

```typescript
const details: FetchMessageDetails = {
  visitor: VISITOR_ID,
  filter: {
    conversationTypes: ['guide', 'live-chat', 'contact-message'],
  },
  limit: 10
};
const messageCursor = await navuApi.fetchMessages(details);
...
```

### Message Conversation Types
Messages can come from different types of conversations with a web visitor:
- **guide**: Messages within a conversation between the visitor and their AI assistant
- **live-chat**: Messages within a conversation between the visitor and a live agent on Slack or Microsoft Teams via Navu
- **contact-message**: Message left by the visitor using the Navu Contact form

## Pageviews
To fetch the pageviews recorded for a specific visitor, use `fetchPageviews`.

The details you provide determines which pageviews will be returned.  You must provide a visitor ID, which is 
returned as part of each visitor record via fetchVisitors.  By default, all pageviews exchanged with that visitor 
will be returned in forward chronological order.  You can specify a filter to limit the pageviews that are returned.  
For example, if you have previously fetched pageviews for this visitor up to some point in time, you can use the
timestamp of that last pageview in the **after** field so that you'll only receive pageviews after that point.

You will get back a cursor that you can use to walk all of the pageviews.  The cursor methods will handle paging and 
throttling.

```typescript
const details: FetchPageviewDetails = {
  visitor: VISITOR_ID,
  filter: {
    after: Date.now() - 60 * 60 * 1000
  },
  limit: 10
};
const pageviewCursor = await navuApi.fetchPageviews(details);
...
```

## Timestamps
All timestamps used in details and responses are numbers that correspond to standard Unix-style timestamps -- i.e.,
milliseconds since January 1, 1970 GMT.

## Cursors, Paging and Throttling
The underlying REST API on which this library uses paging and fetches one page of results at a time.  The library
takes care of requesting the next page as required and will handle throttling using exponential backoff automatically.

## Error Handling
We recommend using try/catch/finally error handling.  Only fatal errors will be thrown.  We recommend closing
cursors in finally clauses to ensure that all resources are disposed promptly.   Only the cursor calls (as opposed to the
initial fetch calls) perform REST operations and are therefore vulnerable to failures.

So a recommended sequence looks like what is shown in the first example under **Getting Started**.

## REST APIs
You are also able to access the REST APIs directly.  Each request must be a POST whose body is JSON-encoded.  It 
must include a valid API Key as the bearer token in an Authorization header:
```
Method: POST
Content-Type: application/json
Authorization: Bearer ak_00A000000000000000000000000000000A00
```

There is a separate URL for each method:
- **fetchQuestions**: https://api.navu.co/SITECODE/v1/fetch-questions
- **fetchVisitors**: https://api.navu.co/SITECODE/v1/fetch-visitors
- **fetchMessages**: https://api.navu.co/SITECODE/v1/fetch-messages
- **fetchPageviews**: https://api.navu.co/SITECODE/v1/fetch-pageviews

If you choose to use the REST APIs directly, you must handle paging and throttling.  If a response contains a **nextPage**
field, to get the next page, include that value in a **nextPage** field along with otherwise identical details.

If using the REST APIs directly, a 429 status code means that you have exceeded your request quota.  You should wait
at least one second before retrying.  If you get sequential 429 errors, you should use exponential backoff, doubling
the delay on each subsequent request until you get a proper response.

