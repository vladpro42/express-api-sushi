import bcrypt from 'bcrypt';
import  dotenv from 'dotenv';
dotenv.config();

export async function hashedPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10)
       return await bcrypt.hash(password, salt);
    } catch (e) {
        console.error(e);
        throw e
    }
}