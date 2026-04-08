import { Gender } from "../../../generated/prisma/client";

export interface IUpdateDoctorSpecialtyPayload {
    specialtyId: string;
    shouldDelete?: boolean;
}

export interface IUpdateDoctorPayload {
    doctor?: {
        name?: string;
        email?: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        gender?: Gender;
        registrationNumber?: string;
        experience?: number;
        appointmentFee?: number;
        qualification?: string;
        currentWorkingPlace?: string;
        designation?: string;
        specialties?: IUpdateDoctorSpecialtyPayload[];
    };
    specialties?: IUpdateDoctorSpecialtyPayload[];
}
