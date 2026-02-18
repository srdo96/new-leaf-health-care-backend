import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    return await prisma.specialty.create({ data: payload });
};

const getAllSpecialty = async (): Promise<Specialty[]> => {
    return await prisma.specialty.findMany();
};

const updateSpecialtyById = async (id: string, payload: Specialty) => {
    console.log(id, payload);
    return await prisma.specialty.update({ where: { id }, data: payload });
};

const deleteSpecialty = async (id: string) => {
    return await prisma.specialty.delete({ where: { id } });
};

export const specialtyService = {
    createSpecialty,
    getAllSpecialty,
    updateSpecialtyById,
    deleteSpecialty,
};
