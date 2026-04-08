import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { adminService } from "./admin.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await adminService.createAdmin();

    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await adminService.getAllAdmins();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admins retrieved successfully",
        data: result,
    });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
    const result = await adminService.getAdminById();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin retrieved successfully",
        data: result,
    });
});

const updateAdminById = catchAsync(async (req: Request, res: Response) => {
    const result = await adminService.updateAdminById();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin updated successfully",
        data: result,
    });
});

const deleteAdminById = catchAsync(async (req: Request, res: Response) => {
    const result = await adminService.deleteAdminById();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin deleted successfully",
        data: result,
    });
});

export const adminController = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
};
