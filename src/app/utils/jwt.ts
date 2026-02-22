/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
    payload: JwtPayload,
    secret: string,
    { expiresIn }: SignOptions,
) => {
    return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret);
        return {
            success: true,
            message: "Token verified successfully",
            data: decoded,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            error,
        };
    }
};

const decodeToken = (token: string) => {
    return jwt.decode(token);
};

export const jwtUtils = {
    createToken,
    verifyToken,
    decodeToken,
};
