// import mongoose from "mongoose";

// const ChatSchema = new mongoose.Schema(
//   {
//     members: {
//       type: Array,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const ChatModel = mongoose.model("Chat", ChatSchema);
// export default ChatModel;

import mongoose from "mongoose";


const chatSchema = new mongoose.Schema(
  {
    person1: {
      type: String,
      required: true,
    },
    person2: {
      type: String,
      required: true,
    },
  },
  {
    collection: "chats",
  }
);

export default mongoose.model("chatSchema", chatSchema);


