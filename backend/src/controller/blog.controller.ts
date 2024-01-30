import { NextFunction, Request, Response } from "express";
import { Blog, BlogSchemaValidate } from "../model/blog.model";
import { IBlogsQeury } from "./blogQuery.type";
import { CreateError } from "../middleware/ErrorHandler";

class blogController {
  //add blog
  addBlog = async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    };

    const { error, value } = BlogSchemaValidate.validate(data);

    if (error) {
      return next(error);
    } else {
      try {
        const blog = await Blog.create(value);
        return res.status(201).send({
          success: true,
          data: blog,
          message: "Blog created successfully",
        });
      } catch (error) {
        return next(error);
      }
    }
  };

  //get all blogs
  getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    console.log("blogs api called");
    // const title = req.query.title as string | undefined;
    // const userId = req.query.userId as string | undefined;
    let query: IBlogsQeury = {};
    // if (title) query.title = new RegExp(title, "i");
    // if (userId) query.userId = userId;

    // const perPage = parseInt(req.query.limit as string) || 2;
    // const page = parseInt(req.query.page as string) - 1 || 0;

    try {
      const count = await Blog.estimatedDocumentCount();
      // const totalPages = Math.ceil(count / perPage);
      // if (page >= totalPages) {
      //   throw CreateError(400, "Page number exceeds total pages.");
      // }

      const blogs = await Blog.find(
        query
        // {},
        // { skip: perPage * page, limit: perPage, sort: "asc" }
      );

      return res.status(200).send({
        success: true,
        data: {
          total: count,
          blogs,
        },
        message:
          blogs.length > 0 ? "Blogs retrieved successfully" : "No Blog yet!",
      });
    } catch (error) {
      return next(error);
    }
  };

  //get a single blog
  getBlog = async (req: Request, res: Response, next: NextFunction) => {
    console.log("single blog api called");
    const id = req.params.id;
    try {
      const blog = await Blog.findById(id);
      if (blog == null) {
        throw CreateError(404, "Blog not found");
      }
      return res.status(200).send({
        success: true,
        data: blog,
        message: "Blog retrieved successfully",
      });
    } catch (error) {
      return next(error);
    }
  };

  //update blog
  updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      if (!id) {
        throw CreateError(400, "Params has been missing.");
      }
      const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

      if (!blog?.isModified) {
        throw CreateError(400, "Blog hasn't updated!");
      }
      return res.status(203).send({
        success: true,
        data: blog,
        message: "Blog updated successfully",
      });
    } catch (error) {
      return next(error);
    }
  };

  //delete a blog
  deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      if (!id) {
        throw CreateError(400, "Params has been missing.");
      }
      const blog = await Blog.findByIdAndDelete(id);
      if (blog == null) {
        throw CreateError(404, "Blog doesn't exist.");
      }
      return res.status(200).send({
        success: true,
        data: blog,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  };
}

//export class
export const BlogController = new blogController();
