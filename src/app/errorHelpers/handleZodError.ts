import status from "http-status";
import z from "zod";
import { TErrorSources } from "../interfaces/error.interface";

export const handleZodError = (err: z.ZodError) => {
    const errorSources: TErrorSources[] = [];
    const statusCode: number = status.BAD_REQUEST;
    const message = "Validation Error";

    err.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path.join(".") || "unknown",
            message: issue.message,
        });
    });

    return {
        statusCode,
        success: false,
        message,
        errorSources,
    };
};
