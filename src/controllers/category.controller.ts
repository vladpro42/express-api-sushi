import CategoryService from "../services/category.service";
import type { Request, Response } from "express";
import {hashedPassword} from "../utils/hashedPassword";
import {Category, Ingredient} from "../entities";


class CategoryController {

    async getAll(req: Request, res: Response) {
        try {
            const items = await CategoryService.findAll();
            res.json({ success: true, data: items });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async getOneById(req: Request, res: Response) {
        try {
            const item = await CategoryService.findById(Number(req.params.id));
            if (!item) {
                return res.status(404).json({ success: false, error: 'Category not found' });
            }
            res.json({ success: true, data: item });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async createItem(req: Request, res: Response) {
        try {
            const {image,name, url, icon, parentId}: Category = req.body
            const item = await CategoryService.create({name, image, url, icon, parentId});
            res.status(201).json({ success: true, data: item });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const item = await CategoryService.update(Number(req.params.id), req.body);
            if (!item) {
                return res.status(404).json({ success: false, error: 'Category not found' });
            }
            res.json({ success: true, data: item });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async deleteItem(req: Request, res: Response) {
        try {
            const deleted = await CategoryService.delete(Number(req.params.id));
            if (!deleted) {
                return res.status(404).json({ success: false, error: 'Category not found' });
            }
            res.json({ success: true, message: 'Category deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }
}

export default new CategoryController()