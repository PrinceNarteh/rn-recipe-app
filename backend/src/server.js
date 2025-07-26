import express from "express";
import "dotenv/config";
import { ENV } from "./config/env.js";
import {
  addFavourite,
  deleteFavourtie,
  getFavourites,
} from "./controllers/favourites.controller.js";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true });
});

// routes
app.post("/api/favourites", addFavourite);
app.get("/api/favourites/userId", getFavourites);
app.delete("/api/favourites/:userId/:recipeId", deleteFavourtie);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
