import status from "http-status";
import { Status } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async () => {
    return await prisma.doctor.findMany({
        where: {
            isDeleted: false,
        },
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
        where: { id, isDeleted: false },
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true,
                },
            },
            appointments: {
                include: {
                    patient: true,
                    schedule: true,
                    prescription: true,
                },
            },
            doctorSchedules: {
                include: {
                    schedule: true,
                },
            },
            reviews: true,
        },
    });
};

const updateDoctorById = async (id: string, payload: IUpdateDoctorPayload) => {
    const isDoctorExists = await prisma.doctor.findUnique({
        where: { id },
    });

    if (!isDoctorExists) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    const { doctor: doctorData, specialties } = payload;

    await prisma.$transaction(async (tx) => {
        if (doctorData) {
            await tx.doctor.update({
                where: { id },
                data: { ...doctorData },
            });
        }

        if (specialties && specialties.length > 0) {
            for (const specialty of specialties) {
                const { specialtyId, shouldDelete } = specialty;
                if (shouldDelete) {
                    await tx.doctorSpecialty.delete({
                        where: {
                            doctorId_specialtyId: {
                                doctorId: id,
                                specialtyId,
                            },
                        },
                    });
                } else {
                    await tx.doctorSpecialty.upsert({
                        where: {
                            doctorId_specialtyId: {
                                doctorId: id,
                                specialtyId,
                            },
                        },
                        create: {
                            doctorId: id,
                            specialtyId,
                        },
                        update: {},
                    });
                }
            }
        }
    });

    return await getDoctorById(id);
};

// Soft delete doctor
const deleteDoctorById = async (id: string) => {
    const isDoctorExists = await prisma.doctor.findUnique({
        where: { id },
        include: { user: true },
    });

    if (!isDoctorExists) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    await prisma.$transaction(async (tx) => {
        await tx.doctor.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
        await tx.user.update({
            where: { id: isDoctorExists.userId },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                status: Status.DELETED,
            },
        });

        await tx.session.deleteMany({
            where: { userId: isDoctorExists.userId },
        });

        await tx.doctorSpecialty.deleteMany({
            where: { doctorId: id },
        });
    });

    return {
        message: "Doctor deleted successfully",
    };
};

export const doctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById,
};
