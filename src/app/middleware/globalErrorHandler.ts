/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { env } from "../../config/env";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (env.NODE_ENV === "development") {
        console.log("globalErrorHandler --> error:", err);
    }

    const statusCode = status.INTERNAL_SERVER_ERROR;
    const message = "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        error: err.message,
    });
};
