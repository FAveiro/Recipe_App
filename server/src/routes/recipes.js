import express from "express";
import axios from "axios";

import dotenv from "dotenv/config";

import { BookmarkModel } from "../models/Bookmarks.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/nextpage", async (req, res) => {
  const { urlNextPage, user } = req.query;

  if (!urlNextPage || !user) {
    res.status(400);
    return res.json({ message: "Need some information to search." });
  }

  const response = await axios.get(urlNextPage);

  const checked = await checkBookmark({ user, response });

  const objResponse = { data: response.data, checkedInfo: checked };

  res.json(objResponse);
});

router.get("/", async (req, res) => {
  const { query, user } = req.query;

  if (!query || !user) {
    res.status(400);
    return res.json({ message: "Need some information to search." });
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}${query}`;

  const response = await axios.get(url);

  const checked = await checkBookmark({ user, response });

  const objResponse = { data: response.data, checkedInfo: checked };

  res.json(objResponse);
});

const checkBookmark = async ({ user, response }) => {
  let chekedReturn = [];

  const userId = await getUserId(user.toLowerCase());

  //* Get User id
  async function getUserId(userCap) {
    try {
      const user = await UserModel.findOne({ username: userCap }, "_id");
      return user._id;
    } catch (error) {
      console.log(error);
    }
  }

  //* Check bookmark
  async function checkedBookmark(url, user) {
    try {
      const checkId = await BookmarkModel.exists({
        urlRecipe: url,
        username: user,
      }).select("_id");
      return checkId ? checkId.toString() : null;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    for (let info of response.data.hits) {
      try {
        const checkUrl = await checkedBookmark(info.recipe.url, userId);

        if (checkUrl != null) {
          chekedReturn.push(true);
        } else {
          chekedReturn.push(false);
        }
      } catch (error) {
        console.log(error);
        chekedReturn.push(false);
      }
    }

    return chekedReturn;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { router as recipeRouter };
