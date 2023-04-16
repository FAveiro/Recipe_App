import express from "express";

import { BookmarkModel } from "../models/Bookmarks.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/favorite", async (req, res) => {
  const { url, username, infoData, action } = req.body;

  const userCap = username.toLowerCase();

  const user = await UserModel.findOne({ username: userCap });

  // Validation
  if (!user) {
    res.status(404);
    return res.json({ message: "User doesn't exist!" });
  } else if (action != "Add" && action != "Remove") {
    res.status(404);
    return res.json({ message: "Your action is incorrect" });
  }

  // Create/Remove bookmark
  if (action === "Add") {
    const newBookmark = new BookmarkModel({
      urlRecipe: url,
      username: user,
      information: infoData,
    });
    await newBookmark.save();
    res.status(201);
    res.json({ message: "Bookmark added!" });
  } else {
    BookmarkModel.findOneAndRemove({ urlRecipe: url }).then(() => {
      res.status(201);
      res.json({ message: "Bookmark removed!" });
    });
  }
});

router.get("/", async (req, res) => {
  const { user } = req.query;

  if (!user) {
    res.status(400);
    return res.json({ message: "Need some information to search." });
  }

  const userId = await getUserId(user.toLowerCase());

  const bookmarks = await getBookmarks(userId);

  //* Get User id
  async function getUserId(userCap) {
    try {
      const user = await UserModel.findOne({ username: userCap }, "_id");
      return user._id;
    } catch (error) {
      console.log(error);
    }
  }

  //* Get bookmarks
  async function getBookmarks(userId) {
    try {
      const bookmarks = await BookmarkModel.find({ username: userId });
      return bookmarks;
    } catch (error) {
      console.log(error);
    }
  }

  res.json(bookmarks);
});

export { router as bookmarkRouter };
