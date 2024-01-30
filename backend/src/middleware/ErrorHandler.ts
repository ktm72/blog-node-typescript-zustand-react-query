import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status: number;
}

export const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong";

  return res.status(errorStatus).json({
    success: false,
    data: null,
    message: errorMessage,
  });
};

type ICreateError = (status: number, message: string) => CustomError;

export const CreateError: ICreateError = (status, message) => {
  const err = new Error() as CustomError;
  err.status = status;
  err.message = message;
  return err;
};
