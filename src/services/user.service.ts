import {db} from "../db";
import {Repository} from "typeorm";
import {User} from "../entities";
import tokenService from "./token.service";
import {hashedPassword} from "../utils/hashedPassword";


class UserService {

    private userRepo: Repository<User>;

    constructor() {
        this.userRepo = db.getRepository(User);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepo.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepo.findOne({ where: { email } });
    }

    async create(userData: Partial<User>) {
        try {
            const user = this.userRepo.create(userData);
            const tokens =  tokenService.generateBothTokens({
                userId: user.id,
                email: user.email,
                role: user.role,
            })
            user.refreshToken = tokens.refreshToken
            const userSaved = await this.userRepo.save(user);
            return {...tokens, ...userSaved};
        } catch (error) {
            console.log(error);

        }
    }

    async update(id: number, userData: Partial<User>): Promise<User | null> {
        const {email, password: pwd } = userData
        if(email) {
            const isExistsUser = await this.findByEmail(email)
            if(isExistsUser) {
                throw new Error('Email already exists')
            }
        }
        if(!pwd) {
            throw new Error("Password is required");
        }
        const hashPass = await hashedPassword(pwd.toString());
        const updateData = {...userData, password: hashPass};
        await this.userRepo.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.userRepo.delete(id);
        return result.affected !== 0;
    }
    async findActiveUsers(): Promise<User[]> {
        return await this.userRepo
            .createQueryBuilder('user')
            .where('user.isActive = :isActive', { isActive: true })
            .orderBy('user.createdAt', 'DESC')
            .getMany();
    }
}

export default new UserService();