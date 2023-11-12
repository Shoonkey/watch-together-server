import { config as loadEnvironment } from "dotenv";
loadEnvironment();

if (!process.env.GOOGLE_API_KEY) {
  console.error("Terminating process due to missing Google API key");
  process.exit(1);
}

import Fastify from "fastify";
import FastifyCors from "@fastify/cors";

import configureRoutes from "./configureRoutes";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        ignore: "pid,hostname",
      },
    },
  },
});

app.register(FastifyCors, {
  methods: ["GET"],
  origin: (origin, cb) => {
    const url = new URL(origin);

    if (url.hostname === "localhost") {
      cb(null, true);
      return;
    }

    cb(new Error("Forbidden"), false);
  }
});

configureRoutes(app);

async function start() {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
