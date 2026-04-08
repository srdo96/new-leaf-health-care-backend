import status from "http-status";
import { Status } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: { name, email, password },
    });

    if (!data.user) {
        throw new Error("Failed to register patient");
    }

    //** If Patient is not created, then delete the user account */
    //** This is to prevent the user from being created without a patient */

    try {
        const patient = await prisma.patient.create({
            data: {
                userId: data.user.id,
                name,
                email,
            },
        });
        const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            email: data.user.email,
            role: data.user.role,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified,
        });

        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            email: data.user.email,
            role: data.user.role,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified,
        });
        return { ...data, patient, accessToken, refreshToken };
    } catch (error) {
        console.error(error);
        await prisma.user
            .delete({
                where: {
                    id: data.user.id,
                },
            })
            .catch(() => null);
        throw error;
    }
};

interface ILoginPatientPayload {
    email: string;
    password: string;
}
const loginUser = async (payload: ILoginPatientPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: { email, password },
    });

    if (!data.user) {
        throw new Error("Failed to login patient");
    }

    if (data.user.status === Status.BLOCKED) {
        throw new Error("User is blocked");
    }

    if (data.user.isDeleted || data.user.status === Status.DELETED) {
        throw new Error("User is not found or deleted");
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    return { ...data, accessToken, refreshToken };
};

const getMe = async (user: IRequestUser) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: { id: user.userId },
        include: {
            patient: {
                include: {
                    appointments: {
                        include: {
                            doctor: true,
                            schedule: true,
                            prescription: true,
                        },
                    },
                    prescriptions: true,
                    medicalReports: true,
                    patientHealthData: true,
                    reviews: true,
                },
            },
            doctor: {
                include: {
                    appointments: true,
                    specialties: true,
                    prescriptions: true,
                    reviews: true,
                },
            },
        },
    });
    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    return isUserExists;
};

export const authService = {
    registerPatient,
    loginUser,
    getMe,
};
