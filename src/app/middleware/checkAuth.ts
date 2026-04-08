/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Role, Status } from "../../generated/prisma/enums";
import { env } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { prisma } from "../lib/prisma";
import { cookieUtils } from "../utils/cookie";
import { jwtUtils } from "../utils/jwt";

export const checkAuth =
    (...authRoles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Session token verification
            const sessionToken = cookieUtils.getCookie(
                req,
                "better-auth.session_token",
            );
            if (!sessionToken) {
                throw new AppError(
                    status.UNAUTHORIZED,
                    "Unauthorized! Session token not found",
                );
            }

            if (sessionToken) {
                const sessionData = await prisma.session.findFirst({
                    where: {
                        token: sessionToken,
                        expiresAt: { gt: new Date() },
                    },
                    include: { user: true },
                });

                if (sessionData && sessionData?.user) {
                    const user = sessionData.user;
                    const now = new Date();
                    const expiresAt = new Date(sessionData.expiresAt);
                    const createdAt = new Date(sessionData.createdAt);
                    const sessionLifeTime =
                        expiresAt.getTime() - createdAt.getTime();
                    const timeRemaining = expiresAt.getTime() - now.getTime();
                    const sessionPercentage =
                        (timeRemaining / sessionLifeTime) * 100;
                    if (sessionPercentage < 20) {
                        res.setHeader("X-Session-Refresh", "true");
                        res.setHeader(
                            "X-Session-Expires-At",
                            expiresAt.toISOString(),
                        );
                        res.setHeader(
                            "X-Time-Remaining",
                            timeRemaining.toString(),
                        );
                        console.log(
                            "Session is about to expire",
                            sessionPercentage,
                        );
                    }
                    if (
                        user.status === Status.BLOCKED ||
                        user.status === Status.DELETED
                    ) {
                        throw new AppError(
                            status.FORBIDDEN,
                            "Forbidden! User is blocked or deleted",
                        );
                    }
                    if (user.isDeleted) {
                        throw new AppError(
                            status.FORBIDDEN,
                            "Forbidden! User is deleted",
                        );
                    }
                    if (
                        authRoles.length > 0 &&
                        !authRoles.includes(user.role)
                    ) {
                        throw new AppError(
                            status.FORBIDDEN,
                            "Forbidden! User is not authorized",
                        );
                    }
                    req.user = {
                        userId: user.id,
                        role: user.role,
                        email: user.email,
                        status: user.status,
                    };

                    return next();
                }
            }

            // Access token verification
            const accessToken = cookieUtils.getCookie(req, "accessToken");

            if (!accessToken) {
                throw new AppError(
                    status.UNAUTHORIZED,
                    "Unauthorized! No access token provide.",
                );
            }

            const verifiedToken = jwtUtils.verifyToken(
                accessToken,
                env.ACCESS_TOKEN_SECRET,
            );
            if (!verifiedToken.success) {
                throw new AppError(
                    status.UNAUTHORIZED,
                    "Unauthorized! No access token provide.",
                );
            }

            if (
                authRoles.length > 0 &&
                !authRoles.includes(verifiedToken.data!.role as Role)
            ) {
                throw new AppError(
                    status.FORBIDDEN,
                    "Forbidden! User is not authorized",
                );
            }

            return next();
        } catch (error: any) {
            next(error);
        }
    };
