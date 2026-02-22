/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import { env } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleZodError } from "../errorHelpers/handleZodError";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (env.NODE_ENV === "development") {
        console.log("globalErrorHandler --> error:", err);
    }

    const errorSources: TErrorSources[] = [];
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    let stack: string | undefined;

    if (err instanceof z.ZodError) {
        const zodError = handleZodError(err);
        errorSources.push(...zodError.errorSources);
        statusCode = zodError.statusCode;
        message = zodError.message;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
        errorSources.push({
            path: "",
            message: err.message,
        });
    } else if (err instanceof Error) {
        message = err.message;
        statusCode = status.INTERNAL_SERVER_ERROR;
        stack = err.stack;
        errorSources.push({
            path: "",
            message: err.message,
        });
    }

    const errorResponse: TErrorResponse = {
        success: false,
        message,
        errorSources,
        error: env.NODE_ENV === "development" ? err.message : undefined,
        stack: env.NODE_ENV === "development" ? err.stack : undefined,
    };

    res.status(statusCode).json(errorResponse);
};
