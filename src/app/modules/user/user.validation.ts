/**
 * model Doctor {
  id String @id @default(uuid(7))

  name                String
  email               String    @unique
  profilePhoto        String?
  contactNumber       String?
  address             String?
  isDeleted           Boolean   @default(false)
  deletedAt           DateTime?
  gender              Gender
  registrationNumber  String?   @unique
  experience          Int       @default(0)
  appointmentFee      Float
  qualification       String?
  currentWorkingPlace String?
  designation         String?
  averageRating       Float     @default(0.0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId            String            @unique
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  specialties DoctorSpecialty[]

  @@index([isDeleted], name: "idx_doctor_isDeleted")
  @@index([email], name: "idx_doctor_email")
  @@map("doctors")
}

 */

import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(8),
    doctor: z.object({
        name: z.string("Name is required").min(1),
        email: z.email("Email is required"),

        profilePhoto: z.string().optional(),
        contactNumber: z.string("Contact number is required").optional(),
        address: z.string().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.HIJRAH]),
        registrationNumber: z.string().min(1),
        experience: z.number().optional(),
        appointmentFee: z.number(),
        qualification: z.string().optional(),
        currentWorkingPlace: z.string().optional(),
        designation: z.string().optional(),
        averageRating: z.number().optional(),
    }),
    specialties: z.array(z.uuid("Specialty is required")).min(1),
});
