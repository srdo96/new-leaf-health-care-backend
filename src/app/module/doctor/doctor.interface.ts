import { Gender } from "../../../generated/prisma/client";

export interface IUpdateDoctorPayload {
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
    specialties?: string[];
}
