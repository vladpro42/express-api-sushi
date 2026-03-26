import {Repository, UpdateResult} from "typeorm";
import {Category} from "../entities";
import {db} from "../db";
import {hashedPassword} from "../utils/hashedPassword";


class CategoryService {
    private catRepo: Repository<Category>

    constructor() {
        this.catRepo = db.getRepository(Category);
    }

    async findAll(): Promise<Category[]> {
        return await this.catRepo.find();
    }

    async findById(id: number): Promise<Category | null> {
        return await this.catRepo.findOne({where: {id}});
    }

    async create(ingredientData: Partial<Category>) {
        try {
            const item = this.catRepo.create(ingredientData);
            return await this.catRepo.save(item);
            return item
        } catch (error) {
            console.log(error);
        }
    }

    async update(id: number, ingredientData: Partial<Category>): Promise<UpdateResult | Category | null> {
        const res = await this.catRepo.update(id, ingredientData);
        return await this.catRepo.findOne({where: {id}});
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.catRepo.delete(id);
        return result.affected !== 0;
    }
}

export default new CategoryService();