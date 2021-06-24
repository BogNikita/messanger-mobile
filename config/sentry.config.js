import { Integrations } from '@sentry/tracing';

export const sentryConfig = {
  dsn: 'https://ef43e5696e6947dfb4f2556c9d7c16eb@o865955.ingest.sentry.io/5822892',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
};
