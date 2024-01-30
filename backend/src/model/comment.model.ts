import { Schema, model, Types, Document } from "mongoose";
import Joi from "joi";

export const CommentSchemaValidate = Joi.object({
  blogId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  body: Joi.string().required(),
});

interface IComments extends Document {
  blogId: Types.ObjectId;
  name: string;
  email: string;
  body: string;
}

const CommentSchema = new Schema<IComments>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { strict: "throw", timestamps: true }
);
export const Comment = model<IComments>("Comment", CommentSchema);
