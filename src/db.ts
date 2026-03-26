
import {Category, Ingredient, Product, User} from "./entities/"
import {DataSource} from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const db = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User, Product, Category, Ingredient],
    subscribers: [],
    migrations: [],
    synchronize: true,
    logging: true,
})