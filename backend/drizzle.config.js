import { ENV } from "./src/config/env.js";

export default {
  dialect: "postgresql",
  schema: "./src/db/schema.js",
  out: "./src/db/migrations",
  dbCredentials: { url: ENV.DB_URL },
};
