/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
    try {
        const result = await specialtyService.createSpecialty(req.body);
        res.status(201).json({
            success: true,
            message: "Specialty created successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllSpecialty = async (req: Request, res: Response) => {
    try {
        const data = await specialtyService.getAllSpecialty();
        res.status(201).json({
            success: true,
            message: "Specialty created successfully",
            data: data,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to get specialty",
            error: error.message,
        });
    }
};

const updateSpecialtyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const data = await specialtyService.updateSpecialtyById(
            id as string,
            payload,
        );
        res.status(201).json({
            success: true,
            message: "Specialty update successfully",
            data: data,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to get specialty",
            error: error.message,
        });
    }
};

const deleteSpecialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const data = await specialtyService.deleteSpecialty(id as string);
        res.status(201).json({
            success: true,
            message: "Specialty delete successfully",
            data: data,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete specialty",
            error: error.message,
        });
    }
};

export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
    updateSpecialtyById,
    deleteSpecialty,
};
