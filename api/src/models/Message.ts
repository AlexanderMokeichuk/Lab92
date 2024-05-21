import mongoose, {Schema} from "mongoose";
import {MessageFront} from "../type";

const MessageSchema = new Schema<MessageFront>({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;