import express from "express";
import "dotenv/config";
import { ENV } from "./config/env";

const app = express();
const PORT = ENV.PORT || 4001;

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
