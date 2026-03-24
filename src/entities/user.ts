import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"
import {IsEmail, IsString, MinLength} from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsEmail()
    email: string

    @Column()
    @IsString()
    @MinLength(6)
    password: string

    @Column({default: false})
    isVerified: boolean

    @Column({nullable: true})
    activatedLink: string

    @Column({default: 'user'})
    role: string

    @Column({default: ''})
    refreshToken: string
}