// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://e1d7d3e253dcf9b61843610a2d5342d1@o4510724962385920.ingest.us.sentry.io/4510724970708992",
  integrations:[
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // tracesSampleRate:1.0,  // 100%
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  //sendDefaultPii: true,
});
Sentry.profiler.startProfiler();