import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { bookmarkRouter } from "./routes/bookmark.js";
import { recipeRouter } from "./routes/recipes.js";

import dotenv from "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(
  "mongodb+srv://fasilva:" +
    process.env.PASSWORD_MONGODB +
    "@recipes.vkpwshy.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED!"));
