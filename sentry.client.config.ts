import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN: string =
    process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || '';

Sentry.init({
    dsn: SENTRY_DSN || "https://5cf745ac9b2743fc92fc8f762648c212@o1054523.ingest.sentry.io/6039958",
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});