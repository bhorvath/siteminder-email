# siteminder-email

## Installation

Install dependencies:

```bash
yarn install
```

Build and transpile:

```bash
yarn build
```

## Testing

Unit tests can be run via:

```bash
yarn test
```

## Running

Make sure you have followed the instructions above to build the service first. The service can then
be started via:

```bash
yarn start
```

This will start both the API service, as well as the periodic sending of emails.

## Usage

The API service can be accessed at `localhost:3000`. Further to this, Swagger UI is available at `localhost:3000/docs` to allow the API to be tested.

The OpenAPI spec for the endpoint is available [here](spec/swagger.json).

The only mail provider implemented at this time is [Mailjet](https://www.mailjet.com/). To test with Mailjet, copy `.env.example` to `.env` and populate with a public and private API key. 

An example call may look like this:

```bash
curl -X POST localhost:3000/api/v1/emails \
  -H 'Content-Type: application/json' \
  -d '{
        "fromAddress": "bob@siteminder.com",
        "toAddresses": ["jill@siteminder.com"],
        "subject": "test",
        "body": "test email."
      }'
```

# Overview

I have chosen to architect the solution whereby the API and the process to send mail are decoupled. Although they run as a single service at present, they would be broken out into two discrete services in a production environment. This brings several benefits:

- The services can be developed independently.
- The services can be scaled horizontally to meet differing loads for each process.
- Queuing mail asynchronously provides a better user and inter-service experience as the consumer is not blocked.
- Queuing mail asynchronously allows failed send attempts to be retried in the background.

I have written my code using a test driven development approach and this is reflected in the individual commits.

I have chosen to use [tsoa](https://github.com/lukeautry/tsoa) for the API service as it provides a low-opinion framework for developing REST API services. Benefits include auto-generation of OpenAPI spec and out-of-the box field validation.  

I have made heavy use of interfaces and dependency injection to allow the code to be loosely coupled and easily extensible with future implementations (eg. different data stores or additional providers). With that in mind, tsoa does not provide a composition root, so I have made use of [TSyringe](https://github.com/microsoft/tsyringe) for dependency injection in the API service.

In the interest of time, I have embedded the mail sending service within the API service. A shared in-memory data store is read every 30 seconds for any emails that need processing. Multiple third party mail providers can be specified and each is tried in turn until once succeeds, at which point the email is marked with a success state. If an email cannot be sent with any of the given providers, it is marked with an error state.

The requirements of the task state that the solution should be deployed for testing, however authentication is explicitly stated as being outside the scope of requirements. I have therefore decided to not deploy this solution publicly.

# Todo
- Refactor API and mail sender into discrete services
- Add authentication and authorisation to API
- Add rate limiting to API
- Add additional validation (eg. email format, max length of fields) to API
- Add implementation for a persistent data store of email records
- Add implementations for other mail providers (a skeleton has been added for Mailgun and SendGrid).
- Add retry logic for failed emails (with a max retry count).
- Add additional persisted data including timestamps and logs of success/errors.
- Add additional unhappy path/edge case testing
- Add integration and component tests
- Add additional documentation to the endpoint regarding success/failure responses.
- Add additional endpoint to allow the status of emails to be queried.
- Investigate batching of mail to improve throughput
