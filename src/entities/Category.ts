import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {IsString} from "class-validator";
import {Ingredient} from "./Ingredient";
import {Product} from "./Product";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    name: string

    @Column()
    @IsString()
    image: string

    @Column()
    @IsString()
    url: string

    @Column()
    @IsString()
    icon: string

    @Column()
    parentId: number

    @Column({default: true})
    isActive: boolean

    @Column({default: 999})
    sort: number

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}