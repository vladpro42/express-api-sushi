import userService from "../services/user.service";
import type { Request, Response } from "express";
import {hashedPassword} from "../utils/hashedPassword";


class UserController {

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.findAll();
            res.json({ success: true, data: users });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await userService.findById(Number(req.params.id));
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, data: user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const {email, password } = req.body
            const hashPass = await hashedPassword(password.toString());
            const existsEmail = await userService.findByEmail(email);
            if(existsEmail) {
                throw new Error("Email already exists");
            }
            const user = await userService.create({ email, password: hashPass});
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async updateUser(req: Request, res: Response) {
        try {

            const user = await userService.update(Number(req.params.id), req.body);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, data: user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const deleted = await userService.delete(Number(req.params.id));
            if (!deleted) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }
}

export  default new UserController()