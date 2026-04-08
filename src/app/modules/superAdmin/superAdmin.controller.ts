import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { superAdminService } from "./superAdmin.service";

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await superAdminService.createSuperAdmin();

    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Super admin created successfully",
        data: result,
    });
});

const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await superAdminService.getAllSuperAdmins();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Super admins retrieved successfully",
        data: result,
    });
});

const getSuperAdminById = catchAsync(async (req: Request, res: Response) => {
    const result = await superAdminService.getSuperAdminById();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Super admin retrieved successfully",
        data: result,
    });
});

const updateSuperAdminById = catchAsync(async (req: Request, res: Response) => {
    const result = await superAdminService.updateSuperAdminById();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Super admin updated successfully",
        data: result,
    });
});

const deleteSuperAdminById = catchAsync(async (req: Request, res: Response) => {
    const result = await superAdminService.deleteSuperAdminById();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Super admin deleted successfully",
        data: result,
    });
});

export const superAdminController = {
    createSuperAdmin,
    getAllSuperAdmins,
    getSuperAdminById,
    updateSuperAdminById,
    deleteSuperAdminById,
};
