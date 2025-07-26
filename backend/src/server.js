import express from "express";
import "dotenv/config";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favouritesTable } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true });
});

app.get("/api/favourite", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "missing required fields" });
    }

    const newFavourite = await db
      .insert(favouritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json(newFavourite[0]);
  } catch (error) {
    console.log("error adding favourite", error);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
