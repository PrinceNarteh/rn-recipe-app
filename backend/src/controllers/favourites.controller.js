import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { favouritesTable } from "../db/schema.js";

export const getFavourites = async (req, res) => {
  try {
    const { userId } = req.params;
    const userFavourites = await db
      .select()
      .from(favouritesTable)
      .where(eq(favouritesTable.userId, userId));
    res.status(200).json(userFavourites);
  } catch (error) {
    console.log("error adding favourite", error);
    res.status(500).json({ error: "something went wrong" });
  }
};

export const addFavourite = async (req, res) => {
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
};

export const deleteFavourtie = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    await db
      .delete(favouritesTable)
      .where(
        and(
          eq(favouritesTable.userId, userId),
          eq(favouritesTable.recipeId, parseInt(recipeId, 10)),
        ),
      );
    res.status(200).json({ msg: "favourite removed successfully" });
  } catch (error) {
    console.log("error adding favourite", error);
    res.status(500).json({ error: "something went wrong" });
  }
};
