import {NextFunction, Response, Request} from "express";
import tokenService from "../services/token.service";
import {db} from "../db";
import {User} from "../entities";

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        email: string;
        role?: string;
    };
    token?: string;
}

export async function checkIsAuth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'No token provided',
                code: 'NO_TOKEN'
            });
        }

        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token format',
                code: 'INVALID_FORMAT'
            });
        }

        const payload = await tokenService.isValidAccessToken(accessToken);

        if (!payload) {
            return res.status(401).json({
                success: false,
                error: 'Invalid or expired token',
                code: 'INVALID_TOKEN'
            });
        }

        const userExists = await checkUserExists(payload.userId);
        if (!userExists) {
            return res.status(401).json({
                success: false,
                error: 'User no longer exists',
                code: 'USER_NOT_FOUND'
            });
        }

        req.user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        };
        req.token = accessToken;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error during authentication',
            code: 'SERVER_ERROR'
        });
    }
}

async function checkUserExists(userId: number): Promise<boolean> {
    try {
        const user = await db.manager.findOne(User, { where: { id: userId } });
        return !!user;
    } catch {
        return false;
    }
}