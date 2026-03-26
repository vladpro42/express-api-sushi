import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm"
import {IsString} from "class-validator";
import {Product} from "./Product";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    name: string

    @Column()
    @IsString()
    image: string

    @Column({default: 999})
    sort: number

    @Column({
        default: true
    })
    isActive: boolean

    @ManyToMany(() => Product, (product) => product.ingredients)
    products: Product[]
}