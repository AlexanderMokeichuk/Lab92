import express from "express";
import {MessageApi, MessageFront} from "../type";
import Message from "../models/Message";
import mongoose from "mongoose";

const messagesRouter = express.Router();

messagesRouter.post("/", async (req, res, next) => {
  try {
    const message: MessageFront = {
      userId: req.body.userId,
      message: req.body.message,
      datetime: new Date().toISOString(),
    };

    const saveMessage = new Message(message);
    await saveMessage.save();

    return res.send(saveMessage);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

messagesRouter.get("/", async (req, res, next) => {
  try {

    const messages: MessageApi[] = await Message.find().populate(
      "userId",
      "avatar googleID displayName"
    );
    if (messages.length > 30) {
      const trimmedArray = messages.slice(messages.length);
      return res.send(trimmedArray);
    }

    return res.send(messages);
  } catch (e) {

    next(e);
  }
});

export default messagesRouter;