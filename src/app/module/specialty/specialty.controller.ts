import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { specialtyService } from "./specialty.service";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
    const result = await specialtyService.createSpecialty(req.body);
    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Specialty Created successfully",
        data: result,
    });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
    const result = await specialtyService.getAllSpecialty();
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Specialty fetched successfully",
        data: result,
    });
});

const updateSpecialtyById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await specialtyService.updateSpecialtyById(
        id as string,
        payload,
    );
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Specialty Update successfully",
        data: result,
    });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await specialtyService.deleteSpecialty(id as string);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Specialty deleted successfully",
        data: result,
    });
});

export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
    updateSpecialtyById,
    deleteSpecialty,
};
