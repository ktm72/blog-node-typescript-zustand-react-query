import { NextFunction, Request, Response } from "express";
import { Comment, CommentSchemaValidate } from "../model/comment.model";
import { CreateError } from "../middleware/ErrorHandler";
import { IBlogCommentsQeury } from "./blogQuery.type";

class commentController {
  //add Comment
  addComment = async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      blogId: req.params.blogId,
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
    };
    const { error, value } = CommentSchemaValidate.validate(data);
    if (error) {
      return next(error);
    } else {
      try {
        const comment = await Comment.create(value);
        return res.status(201).send({
          success: true,
          data: comment,
          message: "Comment added successfully",
        });
      } catch (error) {
        return next(error);
      }
    }
  };

  //get all Comments
  getBlogsComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const blogId = req.params.blogId;
    // const perScroll = parseInt(req.query.limit as string) || 2;
    // const scrollSize = parseInt(req.query.size as string) - 1 || 0;
    try {
      if (!blogId) {
        throw CreateError(400, "Params has been missing.");
      }

      // const count = await Comment.find({ blogId }).estimatedDocumentCount();
      // const totalScroll = Math.ceil(count / perScroll);

      // if (scrollSize >= totalScroll) {
      //   throw CreateError(
      //     400,
      //     "scroll number exceeds total scrolling comments."
      //   );
      // }

      const comments = await Comment.find(
        { blogId },
        {}
        // {
        //   skip: perScroll * scrollSize,
        //   limit: perScroll,
        //   sort: "asc",
        // }
      ).exec();

      return res.status(200).send({
        success: true,
        data: {
          total: comments.length,
          comments,
        },
        message:
          comments.length > 0
            ? "Comments retrieved successfully"
            : "No Comment yet!",
      });
    } catch (error) {
      return next(error);
    }
  };

  //get a single Comment
  getComment = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const comment = await Comment.findById(id);
      if (comment == null) {
        throw CreateError(404, "Comment not found");
      }
      return res.status(200).send({
        success: true,
        data: comment,
        message: "Comment retrieved successfully",
      });
    } catch (error) {
      return next(error);
    }
  };

  //update Comment
  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { body } = req.body;

    try {
      if (!id) {
        throw CreateError(400, "Params has been missing.");
      }
      if (body.length < 1) {
        throw CreateError(400, "Discard Comment!");
      }
      const comment = await Comment.findByIdAndUpdate(
        id,
        { body },
        { new: true }
      );

      if (!comment?.isModified) {
        throw CreateError(400, "Comment hasn't updated!");
      }
      return res.status(203).send({
        success: true,
        data: comment,
        message: "Comment updated successfully",
      });
    } catch (error) {
      return next(error);
    }
  };

  //delete a Comment
  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      if (!id) {
        throw CreateError(400, "Params has been missing.");
      }
      const comment = await Comment.findByIdAndDelete(id);
      if (comment == null) {
        throw CreateError(404, "Comment doesn't exist.");
      }
      return res.status(200).send({
        success: true,
        data: comment,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  };
}

export const CommentController = new commentController();
