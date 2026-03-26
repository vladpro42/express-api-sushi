import {Repository, UpdateResult} from "typeorm";
import {Ingredient, User} from "../entities";
import {db} from "../db";
import tokenService from "./token.service";
import {hashedPassword} from "../utils/hashedPassword";


class IngredientService {
    private ingredientRepo: Repository<Ingredient>

    constructor() {
        this.ingredientRepo = db.getRepository(Ingredient);
    }

    async findAll(): Promise<Ingredient[]> {
        return await this.ingredientRepo.find();
    }

    async findById(id: number): Promise<Ingredient | null> {
        return await this.ingredientRepo.findOne({where: {id}});
    }

    async create(ingredientData: Partial<Ingredient>) {
        try {
            const item = this.ingredientRepo.create(ingredientData);
            return await this.ingredientRepo.save(item);
        } catch (error) {
            console.log(error);
        }
    }

    async update(id: number, ingredientData: Partial<Ingredient>): Promise<UpdateResult | null> {
        const res = await this.ingredientRepo.update(id, ingredientData);
        return res
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.ingredientRepo.delete(id);
        return result.affected !== 0;
    }

}

export default new IngredientService();