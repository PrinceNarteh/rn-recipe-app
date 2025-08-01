import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 4001,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
};
