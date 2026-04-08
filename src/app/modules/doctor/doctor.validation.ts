import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const updateDoctorZodSchema = z
    .object({
        name: z.string().min(1).optional(),
        profilePhoto: z.string().optional(),
        contactNumber: z.string().optional(),
        address: z.string().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.HIJRAH]).optional(),
        registrationNumber: z.string().min(1).optional(),
        experience: z.number().optional(),
        appointmentFee: z.number().optional(),
        qualification: z.string().optional(),
        currentWorkingPlace: z.string().optional(),
        designation: z.string().optional(),
        specialties: z.array(z.uuid()).optional(),
    })
    .strict();
