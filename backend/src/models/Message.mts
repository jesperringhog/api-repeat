import { model, Schema, type InferSchemaType } from "mongoose";

export const messageSchema = new Schema(
  {
    from: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: "time", updatedAt: false } },
);

const Message = model("message", messageSchema);

export type Message = InferSchemaType<typeof messageSchema>;

export default Message;
