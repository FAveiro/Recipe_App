import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/Users.js";

const router = express.Router();

//* Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userCap = username.toLowerCase()

  const user = await UserModel.findOne({ username: userCap });

  // Validation
  if (!password || !userCap) {
    res.status(400);
    return res.json({ message: "Empty fields!" });
  }

  if (user) {
    res.status(400);
    return res.json({ message: "User already exists!" });
  }
  
  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = new UserModel({ username: userCap, password: hashedPassword });
  await newUser.save();
  res.status(201);
  res.json({ message: "User created!" });
});

//* Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userCap = username.toLowerCase()

  const user = await UserModel.findOne({ username: userCap });

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
