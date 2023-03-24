import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  // Validation
  if (!password || !username) {
    res.status(400);
    return res.json({ message: "Empty fields!" });
  }

  if (user) {
    res.status(400);
    return res.json({ message: "User already exists!" });
  }

  // Encrypt pw
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.status(201);
  res.json({ message: "User created!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  // Validation
  if (!user) {
    res.status(404);
    return res.json({ message: "User doesn't exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(404);
    return res.json({ message: "Username or password is incorrect!" });
  }

  // Export information from user id

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };
