import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { cookieUtils } from "./cookie";
import { jwtUtils } from "./jwt";

const MAX_AGE = 60 * 60 * 60 * 24; // 1 day

const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(payload, env.ACCESS_TOKEN_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    } as SignOptions);
    return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(
        payload,
        env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
        } as SignOptions,
    );
    return refreshToken;
};

const setAccessTokenCookie = (res: Response, accessToken: string) => {
    cookieUtils.setCookie(res, "accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: MAX_AGE, // 1 day
    });
};

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    cookieUtils.setCookie(res, "refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: MAX_AGE * 7, // 7 days
    });
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: MAX_AGE, // 1 day
    });
};

export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSessionCookie,
};
