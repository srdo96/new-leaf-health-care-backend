import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { userService } from "./user.service";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await userService.createDoctor(payload);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Doctor created successfully",
        data: result,
    });
});

export const userController = {
    createDoctor,
};
