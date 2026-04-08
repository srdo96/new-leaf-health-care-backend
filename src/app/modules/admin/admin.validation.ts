import { z } from "zod";

const createAdminZodValidationSchema = z.object({
    body: z.object({}),
});

const updateAdminZodValidationSchema = z.object({
    body: z.object({}).partial(),
});

export const adminValidation = {
    createAdminZodValidationSchema,
    updateAdminZodValidationSchema,
};
