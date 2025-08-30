import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        sender: { type: String, enum: ["user", "bot"], required: true },
    },
    { timestamps: true }
);

const chatSchema = new mongoose.Schema(
    {
        messages: [messageSchema],
        title: { type: String, default: null },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            default: null
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
