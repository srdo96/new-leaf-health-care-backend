import { DoctorUpdateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async () => {
    return await prisma.doctor.findMany({
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true,
                },
            },
        },
    });
};

const getDoctorById = async (id: string) => {
    return await prisma.doctor.findUniqueOrThrow({
        where: { id },
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true,
                },
            },
        },
    });
};

const updateDoctorById = async (id: string, payload: IUpdateDoctorPayload) => {
    return await prisma.doctor.update({
        where: { id },
        data: {
            ...payload,
            specialties: {
                deleteMany: {},
                create: payload.specialties?.map((specialty) => ({
                    specialtyId: specialty,
                })),
            },
        } as unknown as DoctorUpdateInput,
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true,
                },
            },
        },
    });
};

const deleteDoctorById = async (id: string) => {
    return await prisma.doctor.delete({
        where: { id },
    });
};

export const doctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById,
};
