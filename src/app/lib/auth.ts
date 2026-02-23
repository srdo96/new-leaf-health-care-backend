import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role, Status } from "../../generated/prisma/enums";
import { env } from "../config/env";
import { prisma } from "./prisma";

const MAX_AGE = 60 * 60 * 60 * 24; // 1 day
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: { enabled: true },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: Role.PATIENT,
            },
            status: {
                type: "string",
                required: true,
                defaultValue: Status.ACTIVE,
            },
            needPasswordChange: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null,
            },
        },
    },

    session: {
        expiresIn: MAX_AGE,
        updateAge: MAX_AGE,
        cookieCache: {
            enabled: true,
            maxAge: MAX_AGE, // 1 day
        },
    },

    trustedOrigins: [env.BETTER_AUTH_URL],
    advanced: { disableCSRFCheck: true },
});
