import IngredientService from "../services/ingredient.service";
import type { Request, Response } from "express";
import {hashedPassword} from "../utils/hashedPassword";
import {Ingredient} from "../entities";


class IngredientController {

    async getAll(req: Request, res: Response) {
        try {
            const items = await IngredientService.findAll();
            res.json({ success: true, data: items });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async getOneById(req: Request, res: Response) {
        try {
            const item = await IngredientService.findById(Number(req.params.id));
            if (!item) {
                return res.status(404).json({ success: false, error: 'Ingredient not found' });
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
            const {image,name}: Ingredient = req.body
            const item = await IngredientService.create({name, image});
            res.status(201).json({ success: true, data: item });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const item = await IngredientService.update(Number(req.params.id), req.body);
            if (!item) {
                return res.status(404).json({ success: false, error: 'Ingredient not found' });
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
            const deleted = await IngredientService.delete(Number(req.params.id));
            if (!deleted) {
                return res.status(404).json({ success: false, error: 'Ingredient not found' });
            }
            res.json({ success: true, message: 'Ingredient deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    }
}

export default new IngredientController()