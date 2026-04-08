import { z } from "zod";

const createSuperAdminValidationSchema = z.object({
    body: z.object({}),
});

const updateSuperAdminValidationSchema = z.object({
    body: z.object({}).partial(),
});

export const superAdminValidation = {
    createSuperAdminValidationSchema,
    updateSuperAdminValidationSchema,
};
