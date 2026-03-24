import {verify, sign} from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from "./user.service";

dotenv.config();

export interface TokenPayload {
    userId: number;
    email: string;
    role?: string;
}

export interface AccessTokenPayload extends TokenPayload {
    type: 'access'
}

export interface RefreshTokenPayload extends TokenPayload {
    type: 'refresh'
}

class TokenService {
    private ACCESS_TOKEN_SECRET: string
    private REFRESH_TOKEN_SECRET: string
    private ACCESS_TOKEN_EXPIRATION: string
    private REFRESH_TOKEN_EXPIRATION: string


    constructor() {
        this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'falback-secret-key';
        this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fdfsddfssdfdsf';
        this.REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d';
        this.ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '15m';
    }


    generateAccessToken(payload: AccessTokenPayload) {
        //@ts-ignore
        const accessToken = sign(payload, this.ACCESS_TOKEN_SECRET, {
            expiresIn: this.ACCESS_TOKEN_EXPIRATION
        });
        return accessToken;
    }

    generateRefreshToken(payload: RefreshTokenPayload) {
        //@ts-ignore
        const refreshToken = sign(payload, this.REFRESH_TOKEN_SECRET, {
            expiresIn: this.REFRESH_TOKEN_EXPIRATION
        });

        // const user = await userService.update(payload.userId, {token: refreshToken});
        // if(!user) {
        //     throw new Error( 'failed to save token')
        // }
        return refreshToken;
    }

     generateBothTokens(payload: TokenPayload) {
        const accessPayload: AccessTokenPayload = {
            ...payload,
            type: 'access',
        };

        const refreshPayload: RefreshTokenPayload = {
            ...payload,
            type: 'refresh',
            // tokenId,
        };

        const accessToken = this.generateAccessToken(accessPayload);
        const refreshToken = this.generateRefreshToken(refreshPayload);

        return {
            accessToken,
            refreshToken,
            // expiresIn: ''
        };
    }

    async isValidAccessToken(token: string): Promise<AccessTokenPayload | false> {
        if (!token) return false;
        try {
            const payload = verify(token, this.ACCESS_TOKEN_SECRET) as AccessTokenPayload;
            if (payload.type !== 'access') {
                return false;
            }
            return payload
            // const userExists = await userService.findById(payload.userId);
            // if (!userExists) return false;
            // return userExists;
        } catch (error) {
            return false;
        }
    }

    async isValidRefreshToken(token: string): Promise<boolean> {
        if (!token) return false;

        try {
            const payload = verify(token, this.REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
            if (payload.type !== 'refresh') {
                return false;
            }
            // const user = await userService.findById(payload.userId);
            return true;
        } catch (error) {
            return false;
        }
    }

    // async extractingPayload(payload: RefreshTokenPayload | AccessTokenPayload) {}
}

export default new TokenService();