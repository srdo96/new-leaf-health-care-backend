import { Status } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

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

        return { ...data, patient };
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

    return data;
};

export const authService = {
    registerPatient,
    loginUser,
};
