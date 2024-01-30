import { Schema, model, Document } from "mongoose";
import Joi from "joi";

export const BlogSchemaValidate = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  userId: Joi.string().required(),
});
export interface IBlogs extends Document {
  title: string;
  body: string;
  userId: string;
}

const BlogSchema = new Schema<IBlogs>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { strict: "throw", timestamps: true }
);
export const Blog = model<IBlogs>("Blog", BlogSchema);
