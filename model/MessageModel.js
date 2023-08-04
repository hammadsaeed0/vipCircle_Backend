import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema(
//   {
//     chatId: {
//       type: String,
//     },
//     senderId: {
//       type: String,
//     },
//     text: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const MessageModel = mongoose.model("Message", MessageSchema);
// export default MessageModel

// / msg_id, message, sender, chat_id, time
// const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  },
  {
    collection: "messages",
  }
);

export default  mongoose.model("msgSchema", msgSchema);

