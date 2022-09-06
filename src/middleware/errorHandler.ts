import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { ApiError, InternalError, ValidationError } from "../types/error";
import { ApiErrorResponse } from "../types/api";

type FieldError = {
  name: string;
  message: string;
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof ValidateError) {
    console.log("Validation error", { exception: err });
    const error = new ValidationError();
    const fieldErrors = Object.keys(err.fields).map((fieldName) => ({
      name: fieldName,
      message: err.fields[fieldName].message,
    }));

    return createError(res, error, fieldErrors);
  }

  if (err instanceof ApiError) {
    console.log("API error", { exception: err });

    return createError(res, err);
  }

  if (err instanceof Error) {
    console.log("Uncaught error", { exception: err });
    const error = new InternalError();

    return createError(res, error);
  }

  next();
};

const createError = (
  res: Response,
  error: ApiError,
  fieldErrors?: FieldError[]
): Response<ApiErrorResponse> => {
  const errorResponse: ApiErrorResponse = {
    error: {
      code: error.code,
      title: error.title,
      details: error.details,
    },
  };
  if (fieldErrors) {
    errorResponse.error.source = fieldErrors;
  }

  return res.status(error.httpStatus).json(errorResponse);
};
