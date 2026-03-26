import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm"
import {IsDecimal, IsString} from "class-validator";
import {Ingredient} from "./Ingredient";
import {Category} from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    name: string

    @Column()
    @IsString()
    url: string

    @Column()
    @IsString()
    image: string

    @Column()
    @IsString()
    description: string

    @Column('decimal', {
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    @IsDecimal()
    price: number

    @Column()
    weight: number

    @Column()
    isSpicy: boolean

    @Column()
    isVegan: boolean

    @Column()
    isAlcohol: boolean

    @Column()
    isHit: boolean

    @Column()
    isNew: boolean

    // @Column()
    // category_id: number

    @Column({default: true})
    isActive: boolean

    @Column({default: 999})
    sort: number

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.products)
    @JoinTable()
    ingredients: Ingredient[]

    @ManyToOne(() => Category, (category) => category.products)
    category: Category
}